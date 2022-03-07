import { ProofModel, VerifyRecordModel } from "../../../database/init";
import { TModel } from "../../../database/types";
import { IAbi, IContractInfo } from "../../types";
const KiltProofsV1Abi = require("./abis/KiltProofsV1.json") as IAbi[];

export function EventAndModel(): Map<string, TModel> {
  const EventAndModels: Map<string, TModel> = new Map<string, TModel>();

  EventAndModels.set("AddProof", ProofModel);
  EventAndModels.set("AddVerification", VerifyRecordModel);

  return EventAndModels;
}

export const EventFilter = ["AddProof", "AddVerification"];

export const KiltProofsV1ContractInfo: IContractInfo = {
  abi: KiltProofsV1Abi,
  name: "KiltProofsV1",
  address: "0x72AcB0f573287B3eE0375964D220158cD18465cb",
};
