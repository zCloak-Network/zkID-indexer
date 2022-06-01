import { getTRepository } from "../database";
import { PoapEntity } from "../database/entity/Poap";
import { MintPoap } from "../database/types";
import { IMintPoapProcessor } from "./processorsInterface";
import * as log4js from "../utils/log4js";

export default class MintPoapProcessors implements IMintPoapProcessor {
  async isSave(receiptLogData: MintPoap, versionId: number): Promise<boolean> {
    const mintPoapRepository = await getTRepository(PoapEntity);
    const result = await mintPoapRepository.findOneBy({
      versionId: versionId,
      transactionHash: receiptLogData.transactionHash,
    });
    return result === null ? true : false;
  }

  async save(receiptLogData: MintPoap, versionId: number): Promise<void> {
    try {
      const mintPoapRepository = await getTRepository(PoapEntity);
      receiptLogData.versionId = versionId;
      await mintPoapRepository
        .save(receiptLogData as unknown as PoapEntity)
        .then((res) => log4js.info(`mysql save ${mintPoapRepository.metadata.tableName}\n${JSON.stringify(res)}`));
    } catch (error) {
      log4js.error("The error occurs in saving MintPoap.");
      throw new Error(error + "");
    }
  }

  isAdapt(eventType: string): boolean {
    if (eventType === "MintPoap") {
      return true;
    }
    return false;
  }
}
