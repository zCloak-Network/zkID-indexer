import Web3 from "web3";
import { batchTask } from "./batch_task";
import { NETWORK, STARTBLOCK } from "./config/config.base";
import { instantTask } from "./instant_task";
import { ifBatchTask } from "./task_utils";
import contracts from "../contract/index";
import { IContract } from "../contract/types";


async function main() {
  const w3 = new Web3(NETWORK);
  const allContractEvents: Map<string, IContract> = await contracts();
  const blockNumberNow = await w3.eth.getBlockNumber();

  const ifBatchTaskFlag = await ifBatchTask(STARTBLOCK, 2001005);

  ifBatchTaskFlag && (await batchTask());
  !ifBatchTaskFlag &&
    (await instantTask(w3, STARTBLOCK, blockNumberNow, allContractEvents));
}
main();
