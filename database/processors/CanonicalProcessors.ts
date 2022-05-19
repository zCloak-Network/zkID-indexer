import { getTRepository } from "../../src";
import { CanonicalEntity } from "../../src/entity/Canonical";
import { CanonicalModel } from "../init";
import { Canonical, Verifying } from "../types";
import { ICanonicalProcessor } from "./processorsInterface";

export default class CanonicalProcessors implements ICanonicalProcessor {
  async isSave(receiptLogData: Verifying): Promise<boolean> {
    // TODO change to mysql
    const result = await CanonicalModel.find({
      blockHash: receiptLogData.blockHash,
      transactionHash: receiptLogData.transactionHash,
    });
    return result.length === 0 ? true : false;
  }

  async save(receiptLogData: Canonical, versionId: number): Promise<void> {
    try {
      // TODO remove mongodb
      const saveCanonical = new CanonicalModel(receiptLogData);
      await saveCanonical
        .save()
        .then((res) => console.log(`mongodb save ${CanonicalModel.modelName} ${JSON.stringify(res)}`));
      // save to mysql
      const canonicalRepository = await getTRepository(CanonicalEntity);
      const data = await canonicalRepository.findOneBy({
        versionId: versionId,
        transactionHash: receiptLogData.transactionHash,
      });
      if (!data) {
        receiptLogData.versionId = versionId;
        await canonicalRepository
          .save(receiptLogData as unknown as CanonicalEntity)
          .then((res) => console.log(`mysql save ${canonicalRepository.metadata.tableName} ${JSON.stringify(res)}`));
      }
    } catch (error) {
      console.log("The error occurs in saving Canonical.");
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
