import Koa from 'koa';
import pino from 'pino';
import { Logger } from 'tslog';
import winston from 'winston';

import { router } from './routes';

export const pinoLogger = pino({})
export const tsLogger = new Logger({});
export const winstonLogger = winston.createLogger({});

const app = new Koa();

const port = 3000;

app.use(router.routes());

app.listen(port, () => {
  console.log(`🚀 Server is running on port http://localhost:${port}/`);
});
