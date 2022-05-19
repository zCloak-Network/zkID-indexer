import { getTRepository } from "../../src";
import { PoapEntity } from "../../src/entity/Poap";
import { MintPoapModel } from "../init";
import { MintPoap } from "../types";
import { IMintPoapProcessor } from "./processorsInterface";

export default class MintPoapProcessors implements IMintPoapProcessor {
  async isSave(receiptLogData: MintPoap): Promise<boolean> {
    // TODO change to mysql
    const result = await MintPoapModel.find({
      blockHash: receiptLogData.blockHash,
      transactionHash: receiptLogData.transactionHash,
    });
    return result.length === 0 ? true : false;
  }

  async save(receiptLogData: MintPoap, versionId: number): Promise<void> {
    try {
      // TODO remove mongodb
      const saveMintPoap = new MintPoapModel(receiptLogData);
      await saveMintPoap.save().then((res) => console.log(`mongodb save ${MintPoapModel.modelName} ${JSON.stringify(res)}`));

      // save to mysql
      const mintPoapRepository = await getTRepository(PoapEntity);
      const data = await mintPoapRepository.findOneBy({ transactionHash: receiptLogData.transactionHash });
      if (!data) {
        receiptLogData.versionId = versionId;
        await mintPoapRepository
          .save(receiptLogData as unknown as PoapEntity)
          .then((res) => console.log(`mysql save ${mintPoapRepository.metadata.tableName}\n${JSON.stringify(res)}`));
      }
    } catch (error) {
      console.log("The error occurs in saving MintPoap.");
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