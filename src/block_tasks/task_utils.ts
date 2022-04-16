import Web3 from "web3";
import { TransactionReceipt, BlockNumber } from "web3-core";
import { IContract } from "../contract/types";

export async function decodeDataAndSave(
  w3: Web3,
  transactionReceipt: TransactionReceipt,
  allContractEvents: Map<string, IContract>
) {
  if (allContractEvents.get(transactionReceipt.to)) {
    const events = allContractEvents.get(transactionReceipt.to)?.contractEvents;

    if (events) {
      const input = events.get(
        transactionReceipt.logs[0].topics[0]
      )?.eventInputs;
      const models = events.get(
        transactionReceipt.logs[0].topics[0]
      )?.eventModel;

      if (input && models) {
        const decodeData = w3.eth.abi.decodeLog(
          input,
          transactionReceipt.logs[0].data,
          transactionReceipt.logs[0].topics
        ) as unknown as any;
        
        decodeData.blockNumber = transactionReceipt.blockNumber;
        decodeData.transactionHash = transactionReceipt.transactionHash;
        decodeData.blockHash = transactionReceipt.blockHash;

        try {
          const newData = new models(decodeData);
          await newData.save().then((res) => {
            console.log(
              `save to ${models.toString()}\ndata: ${JSON.stringify(res)}`
            );
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}

export function ifBatchTask(start: number, blockNumberNow: number): boolean {
  console.log(`now : ${blockNumberNow}  start   ${start}`);
  if (blockNumberNow > start + 50) {
    return true;
  }
  return false;
}
