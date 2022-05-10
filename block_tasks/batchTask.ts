import Web3 from "web3";
import { IContract } from "../contract/types";
import { saveBestBlockNumber } from "../database/util";
import { decodeAllData } from "./taskUtils";

export async function batchTask(w3: Web3, startBlock: number, endBlock: number, allContractEvents: Array<IContract>) {
  const blockLimit = 10;
  console.log(`task [${startBlock}] ---> [${endBlock}]`);
  
  for (let i = startBlock; i <= endBlock; ) {
    let data: Array<any>;
    if (i + blockLimit >= endBlock) {
      data = await getData(
        w3,
        i,
        endBlock,
        allContractEvents.map((item) => item.address)
      );
    } else {
      data = await getData(
        w3,
        i,
        i + blockLimit - 1,
        allContractEvents.map((item) => item.address)
      );
    }
    data.length && (await decodeAllData(w3, data, allContractEvents));
    i = i + blockLimit;
  }
  console.log(`finish at [${endBlock}]`);
  await saveBestBlockNumber(endBlock);
}

const getData = async (w3: Web3, from: number, to: number, addressArr: Array<string>): Promise<Array<any>> => {
  console.log(`scan [${from}] ---> [${to}]`);
  return await w3.eth.getPastLogs({
    fromBlock: from,
    toBlock: to,
    address: addressArr,
  });
};
