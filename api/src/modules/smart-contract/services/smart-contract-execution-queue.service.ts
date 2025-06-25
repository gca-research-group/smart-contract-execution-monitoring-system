import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel, ConfirmChannel } from 'amqplib';

import { Injectable, Logger } from '@nestjs/common';

import { ContractInvokerDto } from '@app/dtos';

import { SmartContractInvokerService } from './smart-contract-invoker.service';
import { SmartContractOutboundQueueService } from './smart-contract-outbound-queue.service';

export const SMART_CONTRACT_EXECUTION_QUEUE = 'smart-contract-execution-queue';

@Injectable()
export class SmartContractExecutionQueueService {
  private readonly logger = new Logger(SmartContractExecutionQueueService.name);
  private channelWrapper: ChannelWrapper;

  constructor(
    private smartContractInvokerService: SmartContractInvokerService,
    private smartContractOutboundQueueService: SmartContractOutboundQueueService,
  ) {
    this.connect();
  }

  private connect() {
    const connection = amqp.connect([process.env.RABBITMQ_URI!]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) =>
        channel.assertQueue(SMART_CONTRACT_EXECUTION_QUEUE, { durable: true }),
    });
  }

  async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.consume(SMART_CONTRACT_EXECUTION_QUEUE, (message) => {
          if (message) {
            const data = JSON.parse(message.content.toString()) as {
              id: string;
              payload: ContractInvokerDto;
            };

            this.smartContractInvokerService
              .invoke(data)
              .then(() => {
                channel.ack(message);
              })
              .catch(async (err) => {
                await this.smartContractOutboundQueueService.send({
                  id: data.id,
                  payload: data.payload,
                  result: err as unknown,
                  status: 'FAIL',
                });
                this.logger.error('Error processing message:', err);
              });
          }
        });
      });
    } catch (error) {
      this.logger.error('Error starting the consumer:', error);
    }
  }

  async send(data: { id: string; payload: ContractInvokerDto }) {
    try {
      await this.channelWrapper.sendToQueue(
        SMART_CONTRACT_EXECUTION_QUEUE,
        Buffer.from(JSON.stringify(data)),
        {
          persistent: true,
        },
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
