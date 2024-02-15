import { pino, stdTimeFunctions } from 'pino';
import { pinoLogger } from '../index';

export async function logWithPino(ctx: any, next: any) {
    switch (ctx.params.mode) {
        case 'basic':
            basicPinoLogging();
            break;

        case 'custom':
            customPinoLogging();
            break;
    
        default:
            basicPinoLogging();
            break;
    }

    await next();
  }

function basicPinoLogging() {
    /** OUTPUT *************
     * 
     * {"level":30,"time":1707856317950,"pid":14900,"hostname":"rw-admins-MBP","msg":"This is an info log using pino"}
     * {"level":40,"time":1707856317951,"pid":14900,"hostname":"rw-admins-MBP","msg":"This is a warning log using pino"}
     * {"level":50,"time":1707856317951,"pid":14900,"hostname":"rw-admins-MBP","msg":"This is an error log using pino"}
     * {"level":60,"time":1707856317951,"pid":14900,"hostname":"rw-admins-MBP","msg":"This is a fatal log using pino"}
     * 
     */

    pinoLogger.trace('This is a trace log using pino');
    pinoLogger.debug('This is a debug log using pino');
    pinoLogger.info('This is an info log using pino');
    pinoLogger.warn('This is a warning log using pino');
    pinoLogger.error('This is an error log using pino');
    pinoLogger.fatal('This is a fatal log using pino');
}

function customPinoLogging() {
    /** OUTPUT *************
     * 
     * {"level":10,"time":"2024-02-13T21:11:15.676Z","pid":18924,"hostname":"rw-admins-MBP","name":"demo:custom-pino","msg":"This trace log from pino is now visible"}
     * {"level":20,"time":"2024-02-13T21:11:15.677Z","pid":18924,"hostname":"rw-admins-MBP","name":"demo:custom-pino","msg":"This debug log from pino is now visible"}
     * {"level":30,"time":"2024-02-13T21:11:15.678Z","pid":18924,"hostname":"rw-admins-MBP","name":"demo:custom-pino","safe":"This data can be logged","secret":"[Redacted]","msg":"This is a pino log with an object included"}
     * 
     */

    const customLogger = pino({
        // Lower log level to see all messages
        level: 'trace',

        // Add a logger name for data filtering
        name:'demo:custom-pino',

        // Hide sensitive fields from being logged
        redact: ['apikey', 'secret', 'password'],
        
        // Provide a readable format for timestamps
        timestamp: stdTimeFunctions.isoTime
    })

    customLogger.trace('This trace log from pino is now visible');
    customLogger.debug('This debug log from pino is now visible');
    customLogger.info({
        safe: 'This data can be logged',
        secret: 'This data should not be logged'
    }, 'This is a pino log with an object included');
}
