import Web3 from "web3";
import { IContract } from "../contract/types";
import { BLOCKTYPE, decodeTransactionReceiptLogs, getTransactionReceiptLogs } from "../utils/task";
import * as log4js from "../utils/log4js";
import { getLastBlockPointer, saveBlockPointer } from "../controllers/BlockController";
import { getFinalizedBlockNumber } from "../utils/web3Rpc";
import { gaugeSet, gaugeInc } from "../utils/prom";

export async function batchTask(
  w3: Web3,
  startBlock: number,
  endBlock: number,
  allContractEvents: Array<IContract>,
  blockType: string
) {
  const blockLimit = 10;
  if (startBlock <= endBlock) {
    log4js.info(`all tasks [${startBlock}] ---> [${endBlock}] --- best:[${endBlock}]`);
    gaugeSet(blockType, startBlock);
    for (let pointer = startBlock; pointer <= endBlock; ) {
      let data: Array<any>;
      if (pointer + blockLimit >= endBlock) {
        data = await getTransactionReceiptLogs(
          w3,
          pointer,
          endBlock,
          allContractEvents.map((item) => item.address),
          blockType
        );
        gaugeSet(blockType, endBlock);
      } else {
        data = await getTransactionReceiptLogs(
          w3,
          pointer,
          pointer + blockLimit - 1,
          allContractEvents.map((item) => item.address),
          blockType
        );
        gaugeInc(blockType, blockLimit);
      }
      data.length && (await decodeTransactionReceiptLogs(w3, data, allContractEvents, blockType));
      pointer = pointer + blockLimit;
    }
    log4js.info(`finished at [${endBlock}]`);
    log4js.info(`finished timestamp: ${new Date().getTime()}`);
    // TODO remove
    // await saveMysqlBlockNumber(endBlock + 1);
    await saveBlockPointer(endBlock + 1, blockType);
  }
}

export async function scanBest(w3: Web3, allContractEvents: Array<IContract>, config: any) {
  const lastPointer = await getLastBlockPointer(BLOCKTYPE.BEST);
  const startPointer = lastPointer === 0 ? config.startBlock : lastPointer;
  const endPointer = await w3.eth.getBlockNumber();
  await batchTask(w3, startPointer, endPointer, allContractEvents, BLOCKTYPE.BEST);
}

export async function scanFinalized(w3: Web3, allContractEvents: Array<IContract>, config: any) {
  const lastPointer = await getLastBlockPointer(BLOCKTYPE.FINALIZED);
  const startPointer = lastPointer === 0 ? config.startBlock : lastPointer;
  const endPointer = await getFinalizedBlockNumber(w3.currentProvider);
  await batchTask(w3, startPointer, endPointer, allContractEvents, BLOCKTYPE.FINALIZED);
}
