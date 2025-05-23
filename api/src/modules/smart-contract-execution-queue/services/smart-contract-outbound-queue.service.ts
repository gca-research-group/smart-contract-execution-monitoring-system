import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel, ConfirmChannel } from 'amqplib';

import { Injectable, Logger } from '@nestjs/common';

import { EventUpdater } from '@app/dtos';
import { ExecutionResultService } from '@app/modules/execution-result/services';

export const SMART_CONTRACT_OUTBOUND_QUEUE = 'smart-contract-outbound-queue';

@Injectable()
export class SmartContractOutboundQueueService {
  private readonly logger = new Logger(SmartContractOutboundQueueService.name);
  private channelWrapper: ChannelWrapper;

  constructor(private eventUpdaterService: ExecutionResultService) {
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
            this.eventUpdaterService
              .create(JSON.parse(message.content.toString()) as EventUpdater)
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

  async send(data: unknown) {
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
