const winston = require('winston')
const { combine, timestamp, printf, align } = winston.format;

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.File({
      filename: `logs/hoarder-${new Date().toISOString().split('T')[0]}.log`,
    })],
})

const writeLog = (type, message) => {
    if(type == "error")
        logger.error(message)
    else if (type == "warn") 
        logger.warn(message)
    else 
        logger.info(message)
}
module.exports = {writeLog}
