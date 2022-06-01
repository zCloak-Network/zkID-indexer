import { getTRepository } from "../database";
import { ProofEntity } from "../database/entity/Proof";
import { IProofProcessor } from "./processorsInterface";
import * as log4js from "../utils/log4js";

export default class ProofProcessors implements IProofProcessor {
  async isSave(receiptLogData: ProofEntity, versionId: number): Promise<boolean> {
    const proofRepository = await getTRepository(ProofEntity);
    const result = await proofRepository.findOneBy({
      versionId: versionId,
      transactionHash: receiptLogData.transactionHash,
    });
    return result === null ? true : false;
  }

  async save(receiptLogData: ProofEntity, versionId: number): Promise<void> {
    try {
      const proofRepository = await getTRepository(ProofEntity);
      receiptLogData.versionId = versionId;
      await proofRepository
        .save(receiptLogData as unknown as ProofEntity)
        .then((res) => log4js.info(`mysql save ${proofRepository.metadata.tableName} ${JSON.stringify(res)}`));
    } catch (error) {
      log4js.error("The error occurs in saving AddProof.");
      throw new Error(error + "");
    }
  }

  isAdapt(eventType: string): boolean {
    if (eventType === "AddProof") {
      return true;
    }
    return false;
  }
}
