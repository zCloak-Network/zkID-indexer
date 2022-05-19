import { getTRepository } from "../../src";
import { VerifyingEntity } from "../../src/entity/Verifying";
import { VerifyingModel } from "../init";
import { Verifying } from "../types";
import { IVerifyingProcessor } from "./processorsInterface";

export default class VerifyingProcessors implements IVerifyingProcessor {
  async isSave(receiptLogData: Verifying): Promise<boolean> {
    // TODO change to mysql
    const result = await VerifyingModel.find({
      blockHash: receiptLogData.blockHash,
      transactionHash: receiptLogData.transactionHash,
    });
    return result.length === 0 ? true : false;
  }

  async save(receiptLogData: Verifying, versionId: number): Promise<void> {
    try {
      // TODO remove mongodb
      const saveVerifying = new VerifyingModel(receiptLogData);
      await saveVerifying
        .save()
        .then((res) => console.log(`mongodb save  ${VerifyingModel.modelName} ${JSON.stringify(res)}`));

      // save to mysql
      const verifyingRepository = await getTRepository(VerifyingEntity);
      const data = await verifyingRepository.findOneBy({ transactionHash: receiptLogData.transactionHash });
      if (!data) {
        receiptLogData.versionId = versionId;
        await verifyingRepository
          .save(receiptLogData as unknown as VerifyingEntity)
          .then((res) => console.log(`mysql save ${verifyingRepository.metadata.tableName}\n${JSON.stringify(res)}`));
      }
    } catch (error) {
      console.log("The error occurs in saving Verifying.");
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
