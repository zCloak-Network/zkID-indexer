import Web3 from "web3";
import { batchTask } from "./block_tasks/batchTask";
import contractsMap from "./contract";
import { IContract } from "./contract/types";
import config from "./config.json";
import { getLastBestBlockNumber } from "./database/util";
import { checkConfig } from "./contract/util";
import { dealNetworkError, dealOtherError, sendToBot, sleep } from "./block_tasks/taskUtils";

let netErrorCount = 0;

async function main() {
  try {
    checkConfig(config);
    while (true) {
      const w3 = new Web3(config.network);
      const allContractEvents: Array<IContract> = await contractsMap();
      const lastBlock = await getLastBestBlockNumber();
      const taskStartBlock = lastBlock === 0 ? config.startBlock : lastBlock;
      const taskEndBlock = await w3.eth.getBlockNumber();
      await batchTask(w3, taskStartBlock, taskEndBlock, allContractEvents);
      await sleep(12 * 1000);
    }
  } catch (error) {
    const lastBlock = await getLastBestBlockNumber();
    console.log(`error block ${lastBlock}`);

    if ((error + "").search("Error: Invalid JSON RPC response") !== -1) {
      netErrorCount = await dealNetworkError(config, lastBlock, netErrorCount);
      await sleep(12 * 1000);
      await main();
    } else {
      await dealOtherError(error, lastBlock, config);
    }
  }
}
main();
