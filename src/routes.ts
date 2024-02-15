import Router from 'koa-router';

import { logWithPino } from './loggers/pino';
import { logWithTslog } from './loggers/tslog';
import { logWithWinston } from './loggers/winston';

export const router = new Router();

router.get('/pino/:mode', logWithPino);
router.get('/tslog/:mode', logWithTslog);
router.get('/winston/:mode', logWithWinston);