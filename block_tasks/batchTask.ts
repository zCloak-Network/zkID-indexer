import Web3 from "web3";
import { Log } from "web3-core";
import { IContract } from "../contract/types";
import { saveBestBlockNumber } from "../database/util";
import { decodeTransactionReceiptLogs } from "./taskUtils";

export async function batchTask(w3: Web3, startBlock: number, endBlock: number, allContractEvents: Array<IContract>) {
  const blockLimit = 10;
  if (startBlock <= endBlock) {
    console.log(`all tasks [${startBlock}] ---> [${endBlock}] --- best:[${endBlock}]`);
    for (let i = startBlock; i <= endBlock; ) {
      let data: Array<any>;
      if (i + blockLimit >= endBlock) {
        data = await getTransactionReceiptLogs(w3, i, endBlock, allContractEvents.map((item) => item.address));
      } else {
        data = await getTransactionReceiptLogs(w3, i, i + blockLimit - 1, allContractEvents.map((item) => item.address));
      }
      data.length && (await decodeTransactionReceiptLogs(w3, data, allContractEvents));
      i = i + blockLimit;
    }
    console.log(`finish at [${endBlock}]`);
    await saveBestBlockNumber(endBlock);
  } else {
    console.log("waiting new blocks");
  }
}

const getTransactionReceiptLogs = async (w3: Web3, from: number, to: number, addressArr: Array<string>): Promise<Array<Log>> => {
  try {
    console.log(`scan [${from}] ---> [${to}]`);
    return await w3.eth.getPastLogs({
      fromBlock: from,
      toBlock: to,
      address: addressArr,
    });
  } catch (error) {
    console.log("Error occurs in batchTasks getTransactionReceiptLogs");
    throw new Error(error + "");
  }
};
