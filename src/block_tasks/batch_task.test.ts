import Web3 from "web3";
import { IContract } from "../contract/types";
import { batchTask } from "./batch_task";
import { NETWORK, STARTBLOCK } from "./config/config.base";
import { getLastBestBlockNumber } from "./task_utils";
import contracts from "../contract/contractEventMap";

// describe("batch task test", () => {
//   it("more task", async () => {
//     const w3 = new Web3(NETWORK);
//     const allContractEvents: Map<string, IContract> = await contracts();
//     const taskEndBlock = await w3.eth.getBlockNumber();

//     const lastBlock = await getLastBestBlockNumber();
//     console.log(`best block: [${taskEndBlock}]`);

//     const taskStartBlock = lastBlock === 0 ? STARTBLOCK : lastBlock;
//     // console.log(allContractEvents);
//     // await batchTask(w3, 2066406, 2066606, allContractEvents, (val) => {
//     //   console.log(val);
//     // });
//     expect(
//       await batchTask(w3, 2066406, 2066606, allContractEvents, (val) => {
//         // console.log(val);
//         console.log("666");
//         return "666";
//       })
//     ).toEqual("666");
//   });
// });

async function name() {
  const w3 = new Web3(NETWORK);
  const allContractEvents: Map<string, IContract> = await contracts();
  const taskEndBlock = await w3.eth.getBlockNumber();

  const lastBlock = await getLastBestBlockNumber();
  console.log(`best block: [${taskEndBlock}]`);

  const taskStartBlock = lastBlock === 0 ? STARTBLOCK : lastBlock;
  const allContractAddArr: Array<string> = [];
  for (let key of allContractEvents.keys()) {
    allContractAddArr.push(key);
  }
  const block = await w3.eth.getBlock(2073144);
  console.log(block.transactions.length);

  // await batchTask(w3, 2073144, 2073144, allContractEvents, allContractAddArr);
}
name();
