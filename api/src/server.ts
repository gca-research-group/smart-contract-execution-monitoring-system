import { schedule } from 'node-cron';
import app from './app';
import { ScrapCarriers, ScrapDrivers } from './scrappers';
import { logger } from './utils';
import { StartDriverService } from './services/Driver';
import { StartCarrierService } from './services/Carrier';
import { ServiceMonitoring } from './models';

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await ServiceMonitoring.update(
    {
      status: 'IDLE',
    },
    { where: {} },
  );

  schedule('0 0 * * 0', () => StartDriverService());
  schedule('0 0 * * 0', () => StartCarrierService());

  schedule('* * * * *', async () => {
    const isServiceRunning = await ServiceMonitoring.findOne({
      where: {
        status: 'RUNNING',
      },
    });

    if (isServiceRunning) {
      return;
    }

    const queuedService = await ServiceMonitoring.findOne({
      where: {
        status: 'QUEUED',
      },
      order: [['queuedAt', 'ASC']],
    });

    if (!queuedService) {
      return;
    }

    if (queuedService.name === 'DRIVER') {
      await ScrapDrivers();
    } else if (queuedService.name === 'CARRIER') {
      await ScrapCarriers();
    }
  });

  logger.info(`Server lintening on port ${PORT}`);
});
