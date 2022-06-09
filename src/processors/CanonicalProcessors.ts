import { getTRepository } from "../database";
import { CanonicalEntity } from "../database/entity/Canonical";
import { ICanonicalProcessor } from "./processorsInterface";
import * as log4js from "../utils/log4js";
import { BLOCKTYPE } from "../utils/task";

export default class CanonicalProcessors implements ICanonicalProcessor {
  async updateFinalized(transactionHash: string, versionId: number): Promise<void> {
    const canonicalRepository = await getTRepository(CanonicalEntity);
    await canonicalRepository
      .update({ transactionHash: transactionHash, versionId: versionId }, { blockType: BLOCKTYPE.FINALIZED })
      .then((res) => {
        if (res.affected === 1) log4js.info(`update canonical(${transactionHash}) to finalized`);
      });
  }
  async isExisted(transactionHash: string, versionId: number, blockType: string): Promise<boolean> {
    const canonicalRepository = await getTRepository(CanonicalEntity);
    const result = await canonicalRepository.findOneBy({
      versionId: versionId,
      blockType: blockType,
      transactionHash: transactionHash,
    });
    return result === null ? false : true;
  }

  async saveBest(receiptLogData: CanonicalEntity, versionId: number, blockType: string): Promise<void> {
    try {
      const canonicalRepository = await getTRepository(CanonicalEntity);
      receiptLogData.versionId = versionId;
      receiptLogData.blockType = blockType;
      receiptLogData.cOwner = receiptLogData.cOwner.toLowerCase();
      await canonicalRepository
        .save(receiptLogData as unknown as CanonicalEntity)
        .then((res) => log4js.info(`mysql save ${canonicalRepository.metadata.tableName} ${JSON.stringify(res)}`));
    } catch (error) {
      log4js.error("The error occurs in saving Canonical.");
      throw new Error(error + "");
    }
  }

  isAdapt(eventType: string): boolean {
    if (eventType === "Canonical") {
      return true;
    }
    return false;
  }
}
