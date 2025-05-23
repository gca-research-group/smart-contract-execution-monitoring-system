import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel, ConfirmChannel } from 'amqplib';

import { Injectable, Logger } from '@nestjs/common';

export const SMART_CONTRACT_OUTBOUND_QUEUE = 'smart-contract-outbound-queue';

@Injectable()
export class SmartContractOutboundQueueService {
  private readonly logger = new Logger(SmartContractOutboundQueueService.name);
  private channelWrapper: ChannelWrapper;

  constructor() {
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
            // TODO: add service to process the message
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
