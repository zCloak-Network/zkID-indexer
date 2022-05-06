import Web3 from "web3";
import { IContract } from "../contract/types";
import { decodeDataAndSave, decodeAllData, insertBestBlockNumber } from "./task_utils";

export async function batchTask(
  w3: Web3,
  startBlock: number,
  endBlock: number,
  allContractEvents: Map<string, IContract>,
  allContractAddArr: Array<string>
) {
  const blockLimit = 10;
  for (let i = startBlock; i <= endBlock; ) {
    let data: Array<any>;
    if (i + blockLimit >= endBlock) {
      data = await getData(w3, i, endBlock, allContractAddArr);
    } else {
      data = await getData(w3, i, i + blockLimit - 1, allContractAddArr);
    }
    data.length && (await decodeAllData(w3, data, allContractEvents));
    i = i + blockLimit;
  }
  await insertBestBlockNumber(endBlock);
}

const getData = async (w3: Web3, from: number, to: number, addressArr: Array<string>): Promise<Array<any>> => {
  console.log(`scan [${from}] ---> [${to}]`);
  return await w3.eth.getPastLogs({
    fromBlock: from,
    toBlock: to,
    address: addressArr,
  });
};
