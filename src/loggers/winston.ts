import winston, { format } from 'winston';
import { winstonLogger } from '../index';

export async function logWithWinston(ctx: any, next: any) {
    switch (ctx.params.mode) {
        case 'basic':
            basicWinstonLogging();
            break;

        case 'custom':
            customWinstonLogging();
            break;
    
        default:
            basicWinstonLogging();
            break;
    }

    await next();
}

function basicWinstonLogging() {
    /** OUTPUT *************
     * 
     * [winston] Attempt to write logs with no transports, which can increase memory usage: {"message":"This is a silly log using winston","level":"silly"}
     * [winston] Attempt to write logs with no transports, which can increase memory usage: {"message":"This is a debug log using winston","level":"debug"}
     * [winston] Attempt to write logs with no transports, which can increase memory usage: {"message":"This is a verbose log using winston","level":"verbose"}
     * [winston] Attempt to write logs with no transports, which can increase memory usage: {"message":"This is an http log using winston","level":"http"}
     * [winston] Attempt to write logs with no transports, which can increase memory usage: {"message":"This is an info log using winston","level":"info"}
     * [winston] Attempt to write logs with no transports, which can increase memory usage: {"message":"This is a warn log using winston","level":"warn"}
     * [winston] Attempt to write logs with no transports, which can increase memory usage: {"message":"This is an error log using winston","level":"error"}
     * 
     */

    winstonLogger.silly('This is a silly log using winston');
    winstonLogger.debug('This is a debug log using winston');
    winstonLogger.verbose('This is a verbose log using winston');
    winstonLogger.http('This is an http log using winston');
    winstonLogger.info('This is an info log using winston');
    winstonLogger.warn('This is a warn log using winston');
    winstonLogger.error('This is an error log using winston');
}

function customWinstonLogging() {
    /** OUTPUT *************
     * 
     * {"level":"silly","message":"This silly log from winston is now visible","name":"demo:custom-winston","timestamp":"2024-02-13T22:31:14.621Z"}
     * {"level":"debug","message":"This debug log from winston is now visible","name":"demo:custom-winston","timestamp":"2024-02-13T22:31:14.625Z"}
     * {"level":"verbose","message":"This verbose log from winston is now visible","name":"demo:custom-winston","timestamp":"2024-02-13T22:31:14.625Z"}
     * {"level":"http","message":"This http log from winston is now visible","name":"demo:custom-winston","timestamp":"2024-02-13T22:31:14.625Z"}
     * {"level":"info","message":"This is a winston log with an object included","name":"demo:custom-winston","safe":"This data can be logged","secret":"***","timestamp":"2024-02-13T22:31:14.625Z"}
     *
     */

    // Hide sensitive fields from being logged
    const redact = format((info, opts) => {
        const mask = opts.mask || '***';

        Object.keys(info).forEach((key) => {
            if (opts.fields.includes(key)) {
                info[key] = mask;
            }
        })

        return info;
    });

    const customLogger = winston.createLogger({
        // Lower log level to see all messages
        level: 'silly',

        // Explicitly configure output to avoid warning
        transports: [
          new winston.transports.Console()
        ],

        // Add a timestamp to each log message
        format: format.combine(
            format.timestamp(),
            redact({ fields: ['apikey', 'password', 'secret'] }),
            format.json(),
        ),

        // Add a logger name for data filtering
        defaultMeta: {
            name: 'demo:custom-winston'
        }
    })

    customLogger.silly('This silly log from winston is now visible');
    customLogger.debug('This debug log from winston is now visible');
    customLogger.verbose('This verbose log from winston is now visible');
    customLogger.http('This http log from winston is now visible');
    customLogger.info('This is a winston log with an object included', {
        safe: 'This data can be logged',
        secret: 'This data should not be logged'
    });
}

  