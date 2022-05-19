import Web3 from "web3";
import { batchTask } from "./block_tasks/batchTask";
import contractsMap from "./contract";
import { IContract } from "./contract/types";
import config from "./config.json";
import { getLastBestBlockNumber } from "./database/util";
import { dealNetworkError, dealOtherError, initTask, sendToBot, sleep } from "./block_tasks/taskUtils";

let netErrorCount = 0;
let timeout = 2000;

async function main() {
  try {
    const w3 = new Web3(new Web3.providers.HttpProvider(config.network, { timeout: timeout }));
    const allContractEvents: Array<IContract> = await contractsMap(config.contracts);

    await initTask(config, w3);

    while (true) {
      const lastBlock = await getLastBestBlockNumber();
      console.log(lastBlock);

      const taskStartBlock = lastBlock === 0 ? config.startBlock : lastBlock;
      const taskEndBlock = await w3.eth.getBlockNumber();
      await batchTask(w3, taskStartBlock, taskEndBlock, allContractEvents);

      await sleep(1 * 1000);
    }
  } catch (error) {
    const lastBlock = await getLastBestBlockNumber();
    console.log(`error block ${lastBlock}`);

    if ((error + "").search("Invalid JSON RPC response") !== -1) {
      netErrorCount = await dealNetworkError(error, config, lastBlock, netErrorCount);
      await sleep(5 * 1000);
      await main();
    } else {
      await dealOtherError(error, lastBlock, config);
    }
  }
}
main();
