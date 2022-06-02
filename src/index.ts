import Web3 from "web3";
import { batchTask } from "./tasks/batchTask";
import contractsMap from "./contract";
import { IContract } from "./contract/types";
import { BLOCKTYPE, initTask, loadConfigFile, sleep } from "./utils/task";
import * as log4js from "./utils/log4js";
import scan from "./tasks";
import { getLastBlockPointer } from "./controllers/BlockController";
import { dealNetworkError, dealOtherError } from "./utils/error";

let netErrorCount = 0;
let timeout = 5000;

async function main() {
  const config = loadConfigFile(process.argv, __dirname);
  try {
    const w3 = new Web3(new Web3.providers.HttpProvider(config.network, { timeout: timeout }));
    const allContractEvents: Array<IContract> = await contractsMap(config);
    await initTask(config);
    while (true) {
      await scan(w3, allContractEvents, config);
      await sleep(1 * 1000);
    }
  } catch (error) {
    const best = await getLastBlockPointer(BLOCKTYPE.BEST);
    const finalized = await getLastBlockPointer(BLOCKTYPE.FINALIZED);
    log4js.error(`error block \nbest: ${best}\nfinalized: ${finalized}`);

    if ((error + "").search("Invalid JSON RPC response") !== -1) {
      netErrorCount = await dealNetworkError(error, config, best, netErrorCount);
      await sleep(5 * 1000);
      await main();
    } else {
      await dealOtherError(error, best, config);
    }
  }
}
main();
