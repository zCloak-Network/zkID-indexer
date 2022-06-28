import Web3 from "web3";
import { Log } from "web3-core";
import { checkConfig, getTopicAbi, getTopicName, getVersionContract } from "../contract/util";
import { IContract } from "../contract/types";
import { AbiInput } from "web3-utils";
import processors from "../processors";
import * as fs from "fs";
import { initDataSource } from "../database";
import * as log4js from "./log4js";
import { saveBlockPointer } from "../controllers/BlockController";
import { getVersionId } from "../controllers/ContractConfigController";
import path from "path";

export async function getTransactionReceiptLogs(
  w3: Web3,
  from: number,
  to: number,
  addressArr: Array<string>,
  blockType: string
): Promise<Array<Log>> {
  try {
    log4js.info(`scan [${from}] ---> [${to}]`);
    return await w3.eth.getPastLogs({
      fromBlock: from,
      toBlock: to,
      address: addressArr,
    });
  } catch (error) {
    log4js.error("Error occurs in batchTasks getTransactionReceiptLogs");
    await saveBlockPointer(from, blockType);
    throw new Error(error + "");
  }
}

export async function decodeTransactionReceiptLogs(
  w3: Web3,
  logsArray: Log[],
  allContractEvents: Array<IContract>,
  blockType: string
) {
  try {
    log4js.info(
      `❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️${logsArray.length} pieces of data are waiting to be processed.❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️`
    );
    for (let i = 0; i < logsArray.length; i++) {
      const item = logsArray[i];
      const topicInput = getTopicAbi(allContractEvents, item.topics[0]);
      const topicName = getTopicName(allContractEvents, item.topics[0]);
      const versionContract = getVersionContract(allContractEvents, item.topics[0]);
      topicInput &&
        topicName &&
        versionContract &&
        (await decodeTransactionReceiptLog(w3, topicInput, topicName, item, versionContract, blockType));
    }
    log4js.info(
      `❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️${logsArray.length} pieces of data have been processed.❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️`
    );
  } catch (error) {
    log4js.error("Error occurs in decodeTransactionReceiptLogs");
    throw new Error(error + "");
  }
}

async function decodeTransactionReceiptLog(
  w3: Web3,
  topicInput: AbiInput[],
  topicName: string,
  item: Log,
  versionContract: string,
  blockType: string
) {
  const versionChainId = await w3.eth.getChainId();
  const blockInfo = await w3.eth.getBlock(item.blockNumber);
  const decodeData = (await w3.eth.abi.decodeLog(topicInput, item.data, item.topics)) as unknown as any;

  decodeData.blockNumber = item.blockNumber;
  decodeData.blockHash = item.blockHash;
  decodeData.transactionHash = item.transactionHash;
  decodeData.blockTime = blockInfo.timestamp;

  const versionId = await getVersionId(versionChainId, versionContract);

  for (let i = 0; i < processors.length; i++) {
    const processor = processors[i];
    switch (blockType) {
      case BLOCKTYPE.BEST:
        processor.isAdapt(topicName) &&
          !(await processor.isExisted(decodeData.transactionHash, versionId, blockType)) &&
          (await processor.saveBest(decodeData, versionId, blockType));
        break;
      case BLOCKTYPE.FINALIZED:
        processor.isAdapt(topicName) &&
          (await processor.isExisted(decodeData.transactionHash, versionId, BLOCKTYPE.BEST)) &&
          (await processor.updateFinalized(decodeData.transactionHash, versionId));
        break;
    }
  }
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function initTask(config) {
  checkConfig(config);
  await initDataSource(config.mysql);
}

export function loadConfigFile(argv: Array<string>): any {
  checkCommand(argv);
  if (argv[3] === "dev" || argv[3] === "prod") {
    const configFilePath = `${path.resolve(__dirname, "../")}/configs/config.${argv[3]}.json`;
    if (fs.existsSync(configFilePath)) {
      return JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    } else {
      log4js.error(`Make sure you have the config.${argv[3]}.json file!`);
      process.exit(1);
    }
  }
}

function checkCommand(argv: Array<string>) {
  if (argv.length !== 4) {
    log4js.error("Please use the correct command to start!");
    process.exit(1);
  }
}

export enum BLOCKTYPE {
  BEST = "best",
  FINALIZED = "finalized",
}
