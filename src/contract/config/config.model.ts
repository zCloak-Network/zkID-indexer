import {
  AddProofModel,
  VerifyingModel,
  CanonicalModel,
  MintPoapModel,
} from "../../database/init";
import { TModel } from "../../database/types";

import { IAbi, IContractInfo } from "../types";
// import { kiltProofv1abi } from "./KiltProofsV1";

export function EventAndModel(): Map<string, TModel> {
  const EventAndModels: Map<string, TModel> = new Map<string, TModel>();

  EventAndModels.set("AddProof", AddProofModel);
  EventAndModels.set("Verifying", VerifyingModel);
  EventAndModels.set("Canonical", CanonicalModel);
  EventAndModels.set("MintPoap", MintPoapModel);
  return EventAndModels;
}

export const EventFilter = ["AddProof", "Verifying", "Canonical", "MintPoap"];

// export const proofstorageContractInfo: IContractInfo = {
//   abi: proofstorageAbi,
//   name: "proofstorage",
//   address: "0xdD0ded6632EebeB9F5e47644eE2dB2D11F3C6A76",
// };

// export const simpleAggregatorContractInfo: IContractInfo = {
//   abi: simpleAggregatorAbi,
//   name: "simpleAggregator",
//   address: "0x06A0eDD63c5CaE529098721de5e6ac0EB2DBFE8C",
// };
