import { botMessageFormat, sendToBot } from "./bot";
import * as log4js from "./log4js";

export async function dealNetworkError(
  error: any,
  config: any,
  lastBlock: number,
  netErrorCount: number
): Promise<number> {
  log4js.error(error);
  log4js.error(`zkID-indexer will try to reconnect ${config.network} after 5 seconds.`);
  // Start sending alerts after 20 unsuccessful attempts to connect to the network
  const netErrorLimit = 20;
  if (netErrorCount === netErrorLimit) {
    const data = botMessageFormat(
      `**blockNumber**: ${lastBlock}`,
      `${config.name} will try to reconnect ${config.network} after 5 seconds.\n
      **error**: ${error + ""}`
    );
    config.bot_url.length && (await sendToBot(config.bot_url, data));
    return 0;
  } else {
    return netErrorCount + 1;
  }
}

export async function dealOtherError(error: any, lastBlock: number, config: any) {
  log4js.error(`This ${config.network} block scan task has been terminated due to an unexpected error.\n${error}`);
  const data = botMessageFormat(
    `**blockNumber**: ${lastBlock}`,
    `${config.name} block scan task has been terminated due to an unexpected error.\n${error + ""}`
  );
  config.bot_url.length && (await sendToBot(config.bot_url, data));
  process.exit(1);
}
