import winston from "winston";

const { createLogger, format, transports } = winston;

const logger = createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.printf((info) => {
      return `
  ${new Date().toUTCString()} - HTTP: ${info.message}`;
    }),
    winston.format.colorize({ all: true })
  ),
  transports: [new transports.Console()],
});

export const getWinstonInstance = () => logger;
