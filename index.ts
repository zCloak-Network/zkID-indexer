import Web3 from "web3";
import { batchTask } from "./block_tasks/batchTask";
import contractsMap from "./contract";
import { IContract } from "./contract/types";
import axios from "axios";
import { botMessageFormat } from "./bot/bot";
import config from "./config.json";
import { getLastBestBlockNumber } from "./database/util";
import { checkConfig } from "./contract/util";

async function main() {
  try {
    checkConfig(config);
    const w3 = new Web3(config.network);
    const allContractEvents: Array<IContract> = await contractsMap();
    const lastBlock = await getLastBestBlockNumber();
    const taskStartBlock = lastBlock === 0 ? config.startBlock : lastBlock;
    const taskEndBlock = await w3.eth.getBlockNumber();
    console.log(`best: [${taskEndBlock}]`);

    await batchTask(w3, taskStartBlock, taskEndBlock, allContractEvents);
  } catch (error) {
    const lastBlock = await getLastBestBlockNumber();

    console.log(`error block ${lastBlock}`);
    console.log(error);

    const data = botMessageFormat(`**blockNumber**: ${lastBlock}`, error as string);
    // !config.bot_url.length &&
    //   axios
    //     .post(config.bot_url, data)
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // // console.log(error);
    // if ((error as string).search("Error: Invalid JSON RPC response") !== -1) {
    //   console.log(`zkID-indexer will try to reconnect ${config.network} after 12 seconds.`);
    // } else {
    //   console.log(error);
    //   console.log(`This ${config.network} block scan task has been terminated due to an unexpected error.`);
    //   process.exit();
    // }
  }
}
main();
