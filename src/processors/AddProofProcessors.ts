import { getTRepository } from "../database";
import { ProofEntity } from "../database/entity/Proof";
import { IProofProcessor } from "./processorsInterface";
import * as log4js from "../utils/log4js";
import { BLOCKTYPE } from "../utils/task";

export default class ProofProcessors implements IProofProcessor {
  async updateFinalized(transactionHash: string, versionId: number): Promise<void> {
    console.log(transactionHash);
    const proofRepository = await getTRepository(ProofEntity);
    await proofRepository
      .update({ transactionHash: transactionHash, versionId: versionId }, { blockType: BLOCKTYPE.FINALIZED })
      .then((res) => {
        if (res.affected === 1) log4js.info(`update proof(${transactionHash}) to finalized`);
      });
  }

  async isExisted(transactionHash: string, versionId: number, blockType: string): Promise<boolean> {
    const proofRepository = await getTRepository(ProofEntity);
    const result = await proofRepository.findOneBy({
      versionId: versionId,
      blockType: blockType,
      transactionHash: transactionHash,
    });
    return result === null ? false : true;
  }

  async saveBest(receiptLogData: ProofEntity, versionId: number, blockType: string): Promise<void> {
    try {
      const proofRepository = await getTRepository(ProofEntity);
      receiptLogData.versionId = versionId;
      receiptLogData.blockType = blockType;
      receiptLogData.dataOwnerHex = receiptLogData.dataOwner.toLowerCase();
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
