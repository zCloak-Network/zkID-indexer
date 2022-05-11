import Web3 from "web3";
import { Log } from "web3-core";
import { getTopicAbi, getTopicName } from "../contract/util";
import { IContract } from "../contract/types";
import { AddProof, Canonical, MintPoap, Verifying } from "../database/types";
import { AbiInput } from "web3-utils";
import { saveAddProof, saveCanonical, saveMintPoap, saveVerifying } from "../database/util";
import { botMessageFormat, IBotMessageCard } from "../bot/bot";
import axios from "axios";

export async function decodeTransactionReceiptLogs(w3: Web3, logsArray: Log[], allContractEvents: Array<IContract>) {
  logsArray.forEach((item) => {
    const topicInput = getTopicAbi(allContractEvents, item.topics[0]);
    const topicName = getTopicName(allContractEvents, item.topics[0]);
    topicInput && topicName && decodeTransactionReceiptLog(w3, topicInput, topicName, item);
  });
}

async function decodeTransactionReceiptLog(w3: Web3, topicInput: AbiInput[], topicName: string, item: Log) {
  const blockInfo = await w3.eth.getBlock(item.blockNumber);
  const decodeData = await w3.eth.abi.decodeLog(topicInput, item.data, item.topics);

  switch (topicName) {
    case "AddProof":
      await saveAddProof(
        decodeData as unknown as AddProof,
        item.blockNumber,
        item.transactionHash,
        item.blockHash,
        blockInfo.timestamp as number
      );
      break;
    case "Verifying":
      await saveVerifying(
        decodeData as unknown as Verifying,
        item.blockNumber,
        item.transactionHash,
        item.blockHash,
        blockInfo.timestamp as number
      );
      break;
    case "Canonical":
      await saveCanonical(
        decodeData as unknown as Canonical,
        item.blockNumber,
        item.transactionHash,
        item.blockHash,
        blockInfo.timestamp as number
      );
      break;
    case "MintPoap":
      await saveMintPoap(
        decodeData as unknown as MintPoap,
        item.blockNumber,
        item.transactionHash,
        item.blockHash,
        blockInfo.timestamp as number
      );
      break;
  }
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

export async function dealNetworkError(config: any, lastBlock: number, netErrorCount: number): Promise<number> {
  console.log("Network Error!");
  console.log(`zkID-indexer will try to reconnect ${config.network} after 12 seconds.`);
  // Start sending alerts after 50 unsuccessful attempts to connect to the network
  const netErrorLimit = 50;
  if (netErrorCount === netErrorLimit) {
    const data = botMessageFormat(
      `**blockNumber**: ${lastBlock}`,
      `zkID-indexer will try to reconnect ${config.network} after 12 seconds.`
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
    `This ${config.network} block scan task has been terminated due to an unexpected error.\n${error + ""}`
  );
  config.bot_url.length && (await sendToBot(config.bot_url, data));
  process.exit(1);
}
