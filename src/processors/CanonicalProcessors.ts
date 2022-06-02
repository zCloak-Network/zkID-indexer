import { getTRepository } from "../database";
import { CanonicalEntity } from "../database/entity/Canonical";
import { ICanonicalProcessor } from "./processorsInterface";
import * as log4js from "../utils/log4js";

export default class CanonicalProcessors implements ICanonicalProcessor {
  async isSave(receiptLogData: CanonicalEntity, versionId: number, blockType: string): Promise<boolean> {
    const canonicalRepository = await getTRepository(CanonicalEntity);
    const result = await canonicalRepository.findOneBy({
      versionId: versionId,
      blockType: blockType,
      transactionHash: receiptLogData.transactionHash,
    });
    return result === null ? true : false;
  }

  async save(receiptLogData: CanonicalEntity, versionId: number, blockType: string): Promise<void> {
    try {
      const canonicalRepository = await getTRepository(CanonicalEntity);
      receiptLogData.versionId = versionId;
      receiptLogData.blockType = blockType;
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
