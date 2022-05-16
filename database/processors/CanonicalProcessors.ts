import { CanonicalModel } from "../init";
import { Canonical, Verifying } from "../types";
import { ICanonicalProcessor } from "./processorsInterface";

export default class CanonicalProcessors implements ICanonicalProcessor {
  async isSave(receiptLogData: Verifying): Promise<boolean> {
    const result = await CanonicalModel.find({
      blockHash: receiptLogData.blockHash,
      transactionHash: receiptLogData.transactionHash,
    });
    return result.length === 0 ? true : false;
  }

  async save(receiptLogData: Canonical): Promise<void> {
    try {
      const saveCanonical = new CanonicalModel(receiptLogData);
      await saveCanonical.save().then((res) => console.log(`saving ${CanonicalModel.modelName} ${JSON.stringify(res)}`));
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
