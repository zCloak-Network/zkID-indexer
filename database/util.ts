import { BlockRecordModel } from "./init";

export async function saveBestBlockNumber(blockNumber: number) {
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
