import { getTRepository } from "../database";
import { BlockRecordEntity } from "../database/entity/BlockRecord";

export async function saveBestBlockPointer(blockNumber: number) {
  const blockRecordRepository = await getTRepository(BlockRecordEntity);
  const isBlockNumberSaved = await blockRecordRepository.findOneBy({ blockNumber: blockNumber });
  if (!isBlockNumberSaved) {
    const newBlockNumber = new BlockRecordEntity();
    newBlockNumber.blockNumber = blockNumber;
    newBlockNumber.blockType = "best";
    await blockRecordRepository.save(newBlockNumber);
  }
}

export async function getLastBestBlockPointer() {
  const blockRecordRepository = await getTRepository(BlockRecordEntity);
  const blockNumberRecords = (await blockRecordRepository.find({
    where: {
      blockType: "best",
    },
    order: { createTime: "DESC" },
  })) as BlockRecordEntity[];
  return blockNumberRecords[0].blockNumber;
}
