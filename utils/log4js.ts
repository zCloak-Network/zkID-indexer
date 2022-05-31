import log4js from "log4js";

const levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL,
};
log4js.configure({
  appenders: {
    console: {
      type: "console",
    },
    info: {
      type: "dateFile",
      filename: "logs/info/info",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
    error: {
      type: "dateFile",
      filename: "logs/error/error",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
    error: {
      appenders: ["console", "error"],
      level: "error",
    },
    info: {
      appenders: ["console", "info"],
      level: "info",
    },
  },
});

export const debug = (content) => {
  let logger = log4js.getLogger();
  logger.level = levels.debug;
  logger.debug(content);
};

export const error = (content) => {
  let logger = log4js.getLogger("error");
  logger.level = levels.error;
  logger.error(content);
};

export const info = (content) => {
  let logger = log4js.getLogger("info");
  logger.level = levels.info;
  logger.info(content);
};
