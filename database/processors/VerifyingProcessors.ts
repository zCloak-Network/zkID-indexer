import { VerifyingModel } from "../init";
import { Verifying } from "../types";
import { IVerifyingProcessor } from "./processorsInterface";

export default class VerifyingProcessors implements IVerifyingProcessor {
  async isSave(receiptLogData: Verifying): Promise<boolean> {
    const result = await VerifyingModel.find({
      blockHash: receiptLogData.blockHash,
      transactionHash: receiptLogData.transactionHash,
    });
    return result.length === 0 ? true : false;
  }

  async save(receiptLogData: Verifying): Promise<void> {
    try {
      const saveVerifying = new VerifyingModel(receiptLogData);
      await saveVerifying
        .save()
        .then((res) => console.log(`saving ${VerifyingModel.modelName} ${JSON.stringify(res)}`));
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
