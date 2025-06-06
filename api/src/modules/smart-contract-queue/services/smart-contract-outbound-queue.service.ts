import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel, ConfirmChannel } from 'amqplib';

import { Injectable, Logger } from '@nestjs/common';

import { UpdateExecutionResultDto } from '@app/dtos/execution-result';
import { ExecutionResultService } from '@app/modules/execution-result/services';

export const SMART_CONTRACT_OUTBOUND_QUEUE = 'smart-contract-outbound-queue';

@Injectable()
export class SmartContractOutboundQueueService<T = unknown> {
  private readonly logger = new Logger(SmartContractOutboundQueueService.name);
  private channelWrapper: ChannelWrapper;

  constructor(private executionResultService: ExecutionResultService) {
    this.connect();
  }

  private connect() {
    const connection = amqp.connect([process.env.RABBITMQ_URI!]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) =>
        channel.assertQueue(SMART_CONTRACT_OUTBOUND_QUEUE, { durable: true }),
    });
  }

  async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.consume(SMART_CONTRACT_OUTBOUND_QUEUE, (message) => {
          if (message) {
            const data = JSON.parse(message.content.toString()) as {
              id: string;
              payload: unknown;
              result: unknown;
              succeeded: boolean;
            };

            this.executionResultService
              .update(data.id, {
                payload: data.payload,
                result: data.result,
                succeeded: data.succeeded,
              } as UpdateExecutionResultDto)
              .then(() => {
                channel.ack(message);
              })
              .catch((err) => {
                this.logger.error('Error processing message:', err);
              });
          }
        });
      });
    } catch (error) {
      this.logger.error('Error starting the consumer:', error);
    }
  }

  async send(data: T) {
    try {
      await this.channelWrapper.sendToQueue(
        SMART_CONTRACT_OUTBOUND_QUEUE,
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
