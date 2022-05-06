import Web3 from "web3";
import { TransactionReceipt, BlockNumber } from "web3-core";
import { getModels } from "../contract/contractEventMap";
import { IContract, IModelAndInput } from "../contract/types";
import { BlockRecordModel } from "../database/init";
import { AddProof, IDecodeData, TModel } from "../database/types";

export async function decodeDataAndSave(
  w3: Web3,
  transactionReceipt: TransactionReceipt,
  allContractEvents: Map<string, IContract>,
  blockTime: number
) {
  if (transactionReceipt && transactionReceipt?.to) {
    if (allContractEvents.get(transactionReceipt.to)) {
      // console.log(transactionReceipt);
      const events = allContractEvents.get(transactionReceipt.to)?.contractEvents;

      if (events) {
        const logsArray = transactionReceipt.logs;
        logsArray.forEach(async (item) => {
          const input = events.get(item.topics[0])?.eventInputs;
          const models = events.get(item.topics[0])?.eventModel;

          if (input && models) {
            const decodeData = (await w3.eth.abi.decodeLog(input, item.data, item.topics)) as unknown as any;
            // console.log(decodeData);

            decodeData.blockNumber = transactionReceipt.blockNumber;
            decodeData.transactionHash = transactionReceipt.transactionHash;
            decodeData.blockHash = transactionReceipt.blockHash;
            decodeData.blockTime = blockTime;

            try {
              const newData = new models(decodeData);
              await newData.save().then((res) => {
                console.log(`save to ${models.modelName}\ndata: ${JSON.stringify(res)}`);
              });
            } catch (error) {
              await insertBestBlockNumber(decodeData.blockNumber);
              console.log(`save to ${models.modelName} error! \n data:\n ${JSON.stringify(decodeData)}`);
              console.log(error);
              throw new Error(error + "");
            }
          }
        });
      }
    }
  }
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

interface Log {
  address: string;
  data: string;
  topics: string[];
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
}
export async function decodeAllData(w3: Web3, logsArray: Log[], allContractEvents: Map<string, IContract>) {
  // console.log(logsArray);

  for (let i = logsArray.length - 1; i >= 0; i--) {
    const topicsInputModel = getModels(allContractEvents, logsArray[i].topics[0]);
    topicsInputModel && decodeOneAndSave(w3, topicsInputModel, logsArray[i]);
  }
}

async function decodeOneAndSave(w3: Web3, topicsInputModel: IModelAndInput, item: Log) {
  const blockInfo = await w3.eth.getBlock(item.blockNumber);
  const input = topicsInputModel.input;
  const models = topicsInputModel.model;
  const decodeData = (await w3.eth.abi.decodeLog(input, item.data, item.topics)) as unknown as IDecodeData;
  // console.log(decodeData);
  decodeData.blockNumber = item.blockNumber;
  decodeData.transactionHash = item.transactionHash;
  decodeData.blockHash = item.blockHash;
  decodeData.blockTime = blockInfo.timestamp as number;

  await new models(decodeData).save().then((res) => {
    console.log(`save to ${models.modelName}\ndata: ${JSON.stringify(res)}`);
  });
}
