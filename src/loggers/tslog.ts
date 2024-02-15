import { Logger } from 'tslog';
import { tsLogger } from '../index';

export async function logWithTslog(ctx: any, next: any) {
    switch (ctx.params.mode) {
        case 'basic':
            basicTslogLogging();
            break;

        case 'custom':
            customTslogLogging();
            break;
    
        default:
            basicTslogLogging();
            break;
    }

    await next();
  }

function basicTslogLogging() {
    /** OUTPUT *************
     * 
     * 2024-02-13 20:32:01.246	SILLY	/src/loggers/tslog.ts:39	This is a silly log using tslog
     * 2024-02-13 20:32:01.253	TRACE	/src/loggers/tslog.ts:40	This is a trace log using tslog
     * 2024-02-13 20:32:01.254	DEBUG	/src/loggers/tslog.ts:41	This is a debug log using tslog
     * 2024-02-13 20:32:01.255	INFO	/src/loggers/tslog.ts:42	This is an info log using tslog
     * 2024-02-13 20:32:01.256	WARN	/src/loggers/tslog.ts:43	This is a warn log using tslog
     * 2024-02-13 20:32:01.257	ERROR	/src/loggers/tslog.ts:45	This is an error log using tslog
     * 2024-02-13 20:32:01.259	FATAL	/src/loggers/tslog.ts:46	This is a fatal log using tslog
     * 
     */

    tsLogger.silly('This is a silly log using tslog');
    tsLogger.trace('This is a trace log using tslog');
    tsLogger.debug('This is a debug log using tslog');
    tsLogger.info('This is an info log using tslog');
    tsLogger.warn('This is a warn log using tslog');
    tsLogger.error('This is an error log using tslog');
    tsLogger.fatal('This is a fatal log using tslog');
}

function customTslogLogging(){
    /** OUTPUT *************
     * 
     * {
     *    "0":{"safe":"This data can be logged","secret":"[***]"},
     *    "1":"This is a tslog message with an object included",
     *    "_meta":{"runtime":"Nodejs","runtimeVersion":"v20.10.0","hostname":"rw-admins-MBP","name":"demo:custom-tslog","parentNames":"[undefined]","date":"2024-02-13T21:23:39.353Z","logLevelId":3,"logLevelName":"INFO","path":{"fullFilePath":"/Users/zackmiller/dev/logger-comparison/src/loggers/tslog.ts:73:18","fileName":"tslog.ts","fileNameWithLine":"tslog.ts:73","fileColumn":"18","fileLine":"73","filePath":"/src/loggers/tslog.ts","filePathWithLine":"/src/loggers/tslog.ts:73","method":"customTslogLogging"}}
     * }
     * 
     */

    const customLogger = new Logger({
        // Set output format to JSON instead of pretty-print
        type: 'json',

        // Add a logger name for data filtering
        name:'demo:custom-tslog',

        // Hide sensitive fields from being logged
        maskValuesOfKeys: ['apikey', 'secret', 'password'],
    })

    customLogger.info({
        safe: 'This data can be logged',
        secret: 'This data should not be logged'
    }, 'This is a tslog message with an object included');
}