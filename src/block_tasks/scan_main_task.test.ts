import Web3 from "web3";
import { batchTask } from "./batch_task";
import { NETWORK, STARTBLOCK } from "./config/config.test";
import { instantTask } from "./instant_task";
import { getLastBestBlockNumber, ifBatchTask } from "./task_utils";
import contracts from "../contract/contract.local.test";
import { IContract } from "../contract/types";

async function main() {
  const w3 = new Web3(NETWORK);
  const allContractEvents: Map<string, IContract> = await contracts();
  const taskEndBlock = await w3.eth.getBlockNumber();

  const ifBatchTaskFlag = await ifBatchTask(STARTBLOCK, 2001005);

  // ifBatchTaskFlag && (await batchTask());
  // !ifBatchTaskFlag &&
  const lastBlock = await getLastBestBlockNumber();
  console.log(taskEndBlock);

  const taskStartBlock = lastBlock === 0 ? STARTBLOCK : lastBlock;
  // console.log(allContractEvents);

  await instantTask(w3, taskStartBlock, taskEndBlock, allContractEvents);
}
main();
// setInterval(main, 12000);
