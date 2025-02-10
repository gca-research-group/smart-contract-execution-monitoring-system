import app from './app';
import { logger } from './utils';

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  logger.info(`Server lintening on port ${PORT}`);
});
