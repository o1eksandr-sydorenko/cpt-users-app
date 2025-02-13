import express from 'express';
import { Express } from 'express';
import dotenvSafe from 'dotenv-safe';
import { resolve } from 'path';
import { existsSync } from 'fs';

console.log({ status: 'test ' });

let path = resolve(process.cwd(), process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env');
if (!existsSync(path)) {
  path = resolve(process.cwd(), '.env');
}

dotenvSafe.config({
  path: path,
  example: resolve(process.cwd(), '.env.example'),
});

const app = express();

app.get('/api', (_req, res) => {
  res.send('TEST');
});

const runServer = async (app: Express): Promise<void> => {
  const host = process.env.APP_HOST ?? 'localhost';
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;

  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
};

void runServer(app);
