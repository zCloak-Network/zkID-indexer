import { AddProofModel } from "../init";
import { AddProof } from "../types";
import { IProofProcessor } from "./processorsInterface";

export default class ProofProcessors implements IProofProcessor {
  async isSave(receiptLogData: AddProof): Promise<boolean> {
    const result = await AddProofModel.find({
      blockHash: receiptLogData.blockHash,
      transactionHash: receiptLogData.transactionHash,
    });
    return result.length === 0 ? true : false;
  }

  async save(receiptLogData: AddProof): Promise<void> {
    try {
      const saveProof = new AddProofModel(receiptLogData);
      await saveProof.save().then((res) => console.log(`saving ${AddProofModel.modelName} ${JSON.stringify(res)}`));
    } catch (error) {
      console.log("The error occurs in saving AddProof.");
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
