import Web3 from "web3";
import { Log } from "web3-core";
import { IContract } from "../contract/types";
import { saveMysqlBlockNumber } from "../util";
import { decodeTransactionReceiptLogs } from "./taskUtils";
import * as log4js from "../utils/log4js";

export async function batchTask(w3: Web3, startBlock: number, endBlock: number, allContractEvents: Array<IContract>) {
  const blockLimit = 10;
  if (startBlock <= endBlock) {
    log4js.info(`all tasks [${startBlock}] ---> [${endBlock}] --- best:[${endBlock}]`);
    for (let i = startBlock; i <= endBlock; ) {
      let data: Array<any>;
      if (i + blockLimit >= endBlock) {
        data = await getTransactionReceiptLogs(
          w3,
          i,
          endBlock,
          allContractEvents.map((item) => item.address)
        );
      } else {
        data = await getTransactionReceiptLogs(
          w3,
          i,
          i + blockLimit - 1,
          allContractEvents.map((item) => item.address)
        );
      }
      data.length && (await decodeTransactionReceiptLogs(w3, data, allContractEvents));
      i = i + blockLimit;
    }
    log4js.info(`finished at [${endBlock}]`);
    log4js.info(`finished timestamp: ${new Date().getTime()}`);
    await saveMysqlBlockNumber(endBlock + 1);
  } else {
    log4js.info("waiting new blocks");
  }
}

const getTransactionReceiptLogs = async (
  w3: Web3,
  from: number,
  to: number,
  addressArr: Array<string>
): Promise<Array<Log>> => {
  try {
    log4js.info(`scan [${from}] ---> [${to}]`);
    return await w3.eth.getPastLogs({
      fromBlock: from,
      toBlock: to,
      address: addressArr,
    });
  } catch (error) {
    log4js.error("Error occurs in batchTasks getTransactionReceiptLogs");
    await saveMysqlBlockNumber(from);
    throw new Error(error + "");
  }
};
