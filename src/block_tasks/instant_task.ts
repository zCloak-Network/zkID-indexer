import Web3 from "web3";
import { IContract } from "../contract/types";
import { decodeDataAndSave, insertBestBlockNumber } from "./task_utils";

export async function instantTask(
  w3: Web3,
  startBlock: number,
  endBlock: number,
  allContractEvents: Map<string, IContract>
) {
  if (startBlock <= endBlock) {
    console.log(`scan [${startBlock}]--->[${endBlock}]`);
    for (let i = startBlock; i <= endBlock; i++) {
      // console.log(`scaning  ${i}`);
      await scanSingleBlockTransaction(w3, i, allContractEvents);
      await insertBestBlockNumber(i);
    }
  } else {
    console.log(`waiting new blocks`);
  }
}

async function scanSingleBlockTransaction(
  w3: Web3,
  blockNumber: number,
  allContractEvents: Map<string, IContract>
) {
  const singleBlock = await w3.eth.getBlock(blockNumber);
  console.log(singleBlock);

  const transactions = singleBlock.transactions;
  // allContractEvents.get(transactionReceipt.to)
  for (let i = 0; i < transactions.length; i++) {
    const transactionReceipt = await w3.eth.getTransactionReceipt(
      transactions[i]
    );
    await decodeDataAndSave(
      w3,
      transactionReceipt,
      allContractEvents,
      singleBlock.timestamp as number
    );
  }
}
