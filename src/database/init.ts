import { Schema, connect, model } from "mongoose";
import { AddProof, Verifying, Canonical } from "./types";

const AddProofSchema = new Schema<AddProof>({
  blockNumber: {
    type: Number,
    required: false,
  },
  blockHash: {
    type: String,
    required: false,
  },
  transactionHash: {
    type: String,
    required: false,
  },

  dataOwner: {
    type: String,
    required: true,
  },
  attester: {
    type: String,
    required: true,
  },
  cType: {
    type: String,
    required: false,
  },
  programHash: {
    type: String,
    required: true,
  },
  fieldName: {
    type: [Number],
    required: true,
  },
  proofCid: {
    type: String,
    required: true,
  },
  requestHash: {
    type: String,
    required: true,
  },
  rootHash: {
    type: String,
    required: true,
  },
  expectResult: {
    type: [Number],
    required: true,
  },
});
const VerifyingSchema = new Schema<Verifying>({
  blockNumber: {
    type: Number,
    required: false,
  },
  blockHash: {
    type: String,
    required: false,
  },
  transactionHash: {
    type: String,
    required: false,
  },

  cOwner: {
    type: String,
    required: true,
  },
  requestHash: {
    type: String,
    required: true,
  },
  worker: {
    type: String,
    required: true,
  },
  outputHash: {
    type: String,
    required: true,
  },
  roothash: {
    type: String,
    required: true,
  },
  attester: {
    type: String,
    required: true,
  },
  isPassed: {
    type: Boolean,
    required: true,
  },
  calcResult: {
    type: [Number],
    required: true,
  },
});
const CanonicalSchema = new Schema<Canonical>({
  blockNumber: {
    type: Number,
    required: false,
  },
  blockHash: {
    type: String,
    required: false,
  },
  transactionHash: {
    type: String,
    required: false,
  },

  cOwner: {
    type: String,
    required: true,
  },
  requestHash: {
    type: String,
    required: true,
  },
  outputHash: {
    type: String,
    required: true,
  },
});
(async () => {
  await connect("mongodb://127.0.0.1:27017/zCloak")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
})();
export const AddProofModel = model<AddProof>("proofs", AddProofSchema);
export const VerifyingModel = model<Verifying>("verifying", VerifyingSchema);
export const CanonicalModel = model<Canonical>("canonical", CanonicalSchema);
