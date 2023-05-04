import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'http',
  format: format.combine(
    format.printf((info) => {
      return `
  ${new Date().toUTCString()} - HTTP: ${info.message}`;
    }),
    format.colorize({ all: true })
  ),
  transports: [new transports.Console()],
});

export const getWinstonInstance = () => logger;
