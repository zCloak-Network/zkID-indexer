import Web3 from "web3";
import { Log } from "web3-core";
import { checkConfig, getTopicAbi, getTopicName, getVersionContract } from "../contract/util";
import { IContract } from "../contract/types";
import { AbiInput } from "web3-utils";
import { botMessageFormat, IBotMessageCard } from "../bot/bot";
import axios from "axios";
import { getProcessors } from "../database/processors";
import { getVersionId, addNewVersion } from "../src/util";
import * as fs from "fs";
import { initDataSource } from "../src";
import { initMongoDB } from "../database/init";

export async function decodeTransactionReceiptLogs(w3: Web3, logsArray: Log[], allContractEvents: Array<IContract>) {
  try {
    logsArray.forEach((item) => {
      const topicInput = getTopicAbi(allContractEvents, item.topics[0]);
      const topicName = getTopicName(allContractEvents, item.topics[0]);
      const versionContract = getVersionContract(allContractEvents, item.topics[0]);
      topicInput &&
        topicName &&
        versionContract &&
        decodeTransactionReceiptLog(w3, topicInput, topicName, item, versionContract);
    });
  } catch (error) {
    console.log("Error occurs in decodeTransactionReceiptLogs");
    throw new Error(error + "");
  }
}

async function decodeTransactionReceiptLog(
  w3: Web3,
  topicInput: AbiInput[],
  topicName: string,
  item: Log,
  versionContract: string
) {
  const versionChainId = await w3.eth.getChainId();
  const blockInfo = await w3.eth.getBlock(item.blockNumber);
  const decodeData = (await w3.eth.abi.decodeLog(topicInput, item.data, item.topics)) as unknown as any;

  decodeData.blockNumber = item.blockNumber;
  decodeData.blockHash = item.blockHash;
  decodeData.transactionHash = item.transactionHash;
  decodeData.blockTime = blockInfo.timestamp;

  const versionId = await getVersionId(versionChainId, versionContract);

  // TODO remove mongodb
  const processors = getProcessors();
  processors.forEach(async (processor) => {
    processor.isAdapt(topicName) &&
      (await processor.isSave(decodeData)) &&
      (await processor.save(decodeData, versionId, versionContract));
  });
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendToBot(url: string, data: IBotMessageCard) {
  await axios
    .post(url, data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function dealNetworkError(
  error: any,
  config: any,
  lastBlock: number,
  netErrorCount: number
): Promise<number> {
  console.log(error);
  console.log(`zkID-indexer will try to reconnect ${config.network} after 5 seconds.`);
  // Start sending alerts after 50 unsuccessful attempts to connect to the network
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
  console.log(`This ${config.network} block scan task has been terminated due to an unexpected error.\n${error}`);
  const data = botMessageFormat(
    `**blockNumber**: ${lastBlock}`,
    `${config.name} block scan task has been terminated due to an unexpected error.\n${error + ""}`
  );
  config.bot_url.length && (await sendToBot(config.bot_url, data));
  process.exit(1);
}

export async function initTask(config, w3: Web3) {
  checkConfig(config);
  await initDataSource(config.mysql);
  await initMongoDB(config);
  await addNewVersion(w3, config.contracts);
}

export function loadConfigFile(argv: Array<string>, path: string): any {
  checkCommand(argv);
  if (argv[3] === "dev" || argv[3] === "prod") {
    const configFilePath = `${path}/config.${argv[3]}.json`;
    if (fs.existsSync(configFilePath)) {
      return JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    } else {
      console.log(`Make sure you have the config.${argv[3]}.json file `);
      process.exit(1);
    }
  }
}

function checkCommand(argv: Array<string>) {
  if (argv.length !== 4) {
    console.log("Please use the correct command to start!");
    process.exit(1);
  }
}
