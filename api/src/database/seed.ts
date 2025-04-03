import * as fs from 'fs';
import * as path from 'path';

function getSeeders(folderPath: string): string[] {
  const files = fs.readdirSync(folderPath);
  return files.map((file) => path.join(folderPath, file));
}

async function run() {
  const files = getSeeders('./src/database/seeds');
  for (const file of files) {
    const seed = (await import(file)) as { up: () => Promise<void> };
    await seed.up();
  }
}

run()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
