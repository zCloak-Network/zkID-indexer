import Web3 from "web3";
import { IContract } from "../contract/types";
import { decodeDataAndSave, decodeDataAndSave_batch } from "./task_utils";

export async function batchTask(
  w3: Web3,
  startBlock: number,
  endBlock: number,
  allContractEvents: Map<string, IContract>,
  allContractAddArr: Array<string>
) {
  for (let i = startBlock; i <= endBlock; ) {
    let data: Array<any>;
    if (i + 10 >= endBlock) {
      data = await getPastLogs_w3(w3, i, endBlock, allContractAddArr);
    } else {
      data = await getPastLogs_w3(w3, i, i + 10 - 1, allContractAddArr);
    }
    data.length && (await decodeDataAndSave_batch(w3, data, allContractEvents));
    i = i + 10;
  }
}

const getPastLogs_w3 = async (
  w3: Web3,
  from: number,
  to: number,
  addressArr: Array<string>
): Promise<Array<any>> => {
  console.log(`batch scan [${from}] ---> [${to}]`);
  return await w3.eth.getPastLogs({
    fromBlock: from,
    toBlock: to,
    address: addressArr,
  });
};
