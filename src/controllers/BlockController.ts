import { getTRepository } from "../database";
import { BlockRecordEntity } from "../database/entity/BlockRecord";

export async function saveBlockPointer(blockNumber: number, blockType: string) {
  const blockRecordRepository = await getTRepository(BlockRecordEntity);
  const isBlockNumberSaved = await blockRecordRepository.findOneBy({ blockNumber: blockNumber, blockType: blockType });
  if (!isBlockNumberSaved) {
    const newBlockNumber = new BlockRecordEntity();
    newBlockNumber.blockNumber = blockNumber;
    newBlockNumber.blockType = blockType;
    await blockRecordRepository.save(newBlockNumber);
  }
}

export async function getLastBlockPointer(blockType: string) {
  const blockRecordRepository = await getTRepository(BlockRecordEntity);
  const blockNumberRecords = (await blockRecordRepository.find({
    where: {
      blockType: blockType,
    },
    order: { createTime: "DESC" },
  })) as BlockRecordEntity[];
  return blockNumberRecords.length === 0 ? 0 : blockNumberRecords[0].blockNumber;
}
