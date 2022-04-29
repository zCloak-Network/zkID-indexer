import Web3 from "web3";
import { batchTask } from "./batch_task";
import { NETWORK, STARTBLOCK } from "./config/config.base";
import { instantTask } from "./instant_task";
import { getLastBestBlockNumber, ifBatchTask } from "./task_utils";
import contracts from "../contract/contractEventMap";
import { IContract } from "../contract/types";
import axios from "axios";
import { botMessageFormat } from "../bot/bot";
import { config } from "../../db";

async function main() {
  try {
    const w3 = new Web3(NETWORK);
    const allContractEvents: Map<string, IContract> = await contracts();
    const lastBlock = await getLastBestBlockNumber();
    const taskStartBlock = lastBlock === 0 ? STARTBLOCK : lastBlock;
    const taskEndBlock = await w3.eth.getBlockNumber();
    console.log(`best: [${taskEndBlock}]`);
    // const ifBatchTaskFlag = await ifBatchTask(STARTBLOCK, taskEndBlock);
    const allContractAddArr: Array<string> = [];
    for (let key of allContractEvents.keys()) {
      allContractAddArr.push(key);
    }
    // ifBatchTaskFlag &&
    await batchTask(
      w3,
      taskStartBlock,
      taskEndBlock,
      allContractEvents,
      allContractAddArr
    );
    // !ifBatchTaskFlag &&
    //   (await instantTask(w3, taskStartBlock, taskEndBlock, allContractEvents));
    setTimeout(main, 12000);
  } catch (error) {
    console.log(error);
    const lastBlock = await getLastBestBlockNumber();
    const data = botMessageFormat(`**blockNumber**: ${lastBlock}`, error + "");
    // axios
    //   .post(config.bot_url, data)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // setTimeout(main, 12000);
  }
}
main();
