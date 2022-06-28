import { getTRepository } from "../database";
import { VerifyingEntity } from "../database/entity/Verifying";
import { IVerifyingProcessor } from "./processorsInterface";
import * as log4js from "../utils/log4js";
import { BLOCKTYPE } from "../utils/task";

export default class VerifyingProcessors implements IVerifyingProcessor {
  async updateFinalized(transactionHash: string, versionId: number): Promise<void> {
    const verifyingRepository = await getTRepository(VerifyingEntity);
    await verifyingRepository
      .update({ transactionHash: transactionHash, versionId: versionId }, { blockType: BLOCKTYPE.FINALIZED })
      .then((res) => {
        if (res.affected === 1) log4js.info(`update verifying(${transactionHash}) to finalized`);
      });
  }
  async isExisted(transactionHash: string, versionId: number, blockType: string): Promise<boolean> {
    const verifyingRepository = await getTRepository(VerifyingEntity);
    const result = await verifyingRepository.findOneBy({
      versionId: versionId,
      blockType: blockType,
      transactionHash: transactionHash,
    });
    return result === null ? false : true;
  }

  async saveBest(receiptLogData: VerifyingEntity, versionId: number, blockType: string): Promise<void> {
    try {
      const verifyingRepository = await getTRepository(VerifyingEntity);
      receiptLogData.versionId = versionId;
      receiptLogData.blockType = blockType;
      receiptLogData.cOwnerHex = receiptLogData.cOwner.toLowerCase();
      await verifyingRepository
        .save(receiptLogData as unknown as VerifyingEntity)
        .then((res) => log4js.info(`mysql save ${verifyingRepository.metadata.tableName}\n${JSON.stringify(res)}`));
    } catch (error) {
      log4js.error("The error occurs in saving Verifying.");
      throw new Error(error + "");
    }
  }

  isAdapt(eventType: string): boolean {
    if (eventType === "Verifying") {
      return true;
    }
    return false;
  }
}
