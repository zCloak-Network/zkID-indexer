import { MintPoapModel } from "../init";
import { MintPoap } from "../types";
import { IMintPoapProcessor } from "./processorsInterface";

export default class MintPoapProcessors implements IMintPoapProcessor {
  async isSave(receiptLogData: MintPoap): Promise<boolean> {
    const result = await MintPoapModel.find({
      blockHash: receiptLogData.blockHash,
      transactionHash: receiptLogData.transactionHash,
    });
    return result.length === 0 ? true : false;
  }

  async save(receiptLogData: MintPoap): Promise<void> {
    try {
      const saveMintPoap = new MintPoapModel(receiptLogData);
      await saveMintPoap.save().then((res) => console.log(`saving ${MintPoapModel.modelName} ${JSON.stringify(res)}`));
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
