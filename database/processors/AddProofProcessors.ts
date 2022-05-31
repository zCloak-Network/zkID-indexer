import { Repository } from "typeorm";
import { getTRepository } from "../../src";
import { ProofEntity } from "../../src/entity/Proof";
import { AddProofModel } from "../init";
import { AddProof } from "../types";
import { IProofProcessor } from "./processorsInterface";
import * as log4js from "../../utils/log4js";

export default class ProofProcessors implements IProofProcessor {
  async isSave(receiptLogData: AddProof): Promise<boolean> {
    // TODO change to mysql
    const result = await AddProofModel.find({
      blockHash: receiptLogData.blockHash,
      transactionHash: receiptLogData.transactionHash,
    });
    return result.length === 0 ? true : false;
  }

  async save(receiptLogData: AddProof, versionId: number): Promise<void> {
    try {
      // TODO remove mongodb
      const saveProof = new AddProofModel(receiptLogData);
      await saveProof
        .save()
        .then((res) => log4js.info(`mongodb save ${AddProofModel.modelName} ${JSON.stringify(res)}`));

      // save to mysql
      const proofRepository = await getTRepository(ProofEntity);
      const data = await proofRepository.findOneBy({ transactionHash: receiptLogData.transactionHash });
      if (!data) {
        receiptLogData.versionId = versionId;
        await proofRepository
          .save(receiptLogData as unknown as ProofEntity)
          .then((res) => log4js.info(`mysql save ${proofRepository.metadata.tableName} ${JSON.stringify(res)}`));
      }
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
