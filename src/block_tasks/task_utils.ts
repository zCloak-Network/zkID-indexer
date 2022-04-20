import Web3 from "web3";
import { TransactionReceipt, BlockNumber } from "web3-core";
import { IContract } from "../contract/types";
import { BlockRecordModel } from "../database/init";

export async function decodeDataAndSave(
  w3: Web3,
  transactionReceipt: TransactionReceipt,
  allContractEvents: Map<string, IContract>,
  blockTime: number
) {
  if (allContractEvents.get(transactionReceipt.to)) {
    // console.log(transactionReceipt);

    const events = allContractEvents.get(transactionReceipt.to)?.contractEvents;

    if (events) {
      const logsArray = transactionReceipt.logs;
      logsArray.forEach(async (item) => {
        const input = events.get(item.topics[0])?.eventInputs;
        const models = events.get(item.topics[0])?.eventModel;

        if (input && models) {
          const decodeData = w3.eth.abi.decodeLog(
            input,
            item.data,
            item.topics
          ) as unknown as any;
          // console.log(decodeData);

          decodeData.blockNumber = transactionReceipt.blockNumber;
          decodeData.transactionHash = transactionReceipt.transactionHash;
          decodeData.blockHash = transactionReceipt.blockHash;
          decodeData.blockTime = blockTime;

          try {
            const newData = new models(decodeData);
            await newData.save().then((res) => {
              console.log(
                `save to ${models.modelName}\ndata: ${JSON.stringify(res)}`
              );
            });
          } catch (error) {
            console.log(
              `save to ${models.modelName} error! \n data:\n ${JSON.stringify(
                decodeData
              )}`
            );
            console.log(error);
          }
        }
      });
    }
  }
}

export function ifBatchTask(start: number, blockNumberNow: number): boolean {
  // console.log(`now : ${blockNumberNow}  start   ${start}`);
  if (blockNumberNow > start + 50) {
    return true;
  }
  return false;
}

export async function insertBestBlockNumber(blockNumber: number) {
  const block_record = new BlockRecordModel({
    blockNumber: blockNumber + 1,
    blockType: "best",
  });
  await block_record.save();
}

export async function getLastBestBlockNumber(): Promise<number> {
  const dataRecord = await BlockRecordModel.find();
  if (dataRecord.length === 0) return 0;
  return dataRecord[dataRecord.length - 1].blockNumber;
}
