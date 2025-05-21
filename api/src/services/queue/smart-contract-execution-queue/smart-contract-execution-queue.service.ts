import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel, ConfirmChannel } from 'amqplib';

import { Injectable, Logger } from '@nestjs/common';

import { CreateClauseExecutionDto } from '@app/dtos/clause-execution';
import { ContractInvokerService } from '@app/services/contract-invoker';

export const SMART_CONTRACT_EXECUTION_QUEUE = 'smart-contract-execution-queue';

@Injectable()
export class SmartContractExecutionQueueService {
  private readonly logger = new Logger(SmartContractExecutionQueueService.name);
  private channelWrapper: ChannelWrapper;

  constructor(private contractInvokerService: ContractInvokerService) {
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
            this.contractInvokerService.invoke(
              JSON.parse(
                message.content.toString(),
              ) as CreateClauseExecutionDto,
            );

            channel.ack(message);
          }
        });
      });
    } catch (error) {
      this.logger.error('Error starting the consumer:', error);
    }
  }

  async send<T>(mail: T) {
    try {
      await this.channelWrapper.sendToQueue(
        SMART_CONTRACT_EXECUTION_QUEUE,
        Buffer.from(JSON.stringify(mail)),
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
