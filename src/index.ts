import Web3 from "web3";
import { batchTask } from "./block_tasks/batch_task";
import { NETWORK, STARTBLOCK } from "./block_tasks/config/config.base";
import { instantTask } from "./block_tasks/instant_task";
import { getLastBestBlockNumber } from "./block_tasks/task_utils";
import contractsMap from "./contract";
import { IContract } from "./contract/types";
import axios from "axios";
import { botMessageFormat } from "./bot/bot";
import { config } from "../db";

async function main() {
  try {
    const w3 = new Web3(NETWORK);
    const allContractEvents: Map<string, IContract> = await contractsMap();
    const lastBlock = await getLastBestBlockNumber();
    const taskStartBlock = lastBlock === 0 ? STARTBLOCK : lastBlock;
    const taskEndBlock = await w3.eth.getBlockNumber();
    console.log(`best: [${taskEndBlock}]`);

    const allContractAddArr: Array<string> = [];
    for (let key of allContractEvents.keys()) {
      allContractAddArr.push(key);
    }
    // ifBatchTaskFlag &&
    await batchTask(w3, taskStartBlock, taskEndBlock, allContractEvents, allContractAddArr);
  } catch (error) {
    // console.log(error);
    if ((error + "").search("Error: Invalid JSON RPC response") !== -1) {
      const lastBlock = await getLastBestBlockNumber();
      const data = botMessageFormat(`**blockNumber**: ${lastBlock}`, error + "");
      axios
        .post(config.bot_url, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(error);
      process.exit();
    }
  }
}
main();
// setInterval(main, 12000);
