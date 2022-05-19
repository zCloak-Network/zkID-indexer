import { Schema, connect, model } from "mongoose";
import { AddProof, Verifying, Canonical, BlockRecord, MintPoap } from "./types";
import config from "../config.json";

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
  blockTime: {
    type: Number,
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
  fieldNames: {
    type: [String],
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
  blockTime: {
    type: Number,
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
  rootHash: {
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
  blockTime: {
    type: Number,
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

const BlockRecordSchema = new Schema<BlockRecord>({
  blockNumber: {
    type: Number,
    required: true,
  },
  blockHash: {
    type: String,
    required: false,
  },
  blockType: {
    type: String,
    required: true,
  },
});

const MintPoapSchema = new Schema<MintPoap>({
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
  blockTime: {
    type: Number,
    required: false,
  },

  poapId: {
    type: String,
    required: true,
  },
  who: {
    type: String,
    required: true,
  },
  nftId: {
    type: String,
    required: true,
  },
});

export async function initMongoDB(config) {
  await connect(config.mongodb.url, {
    user: config.mongodb.user,
    pass: config.mongodb.password,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}

export const AddProofModel = model<AddProof>("proofs", AddProofSchema);
export const VerifyingModel = model<Verifying>("verifying", VerifyingSchema);
export const CanonicalModel = model<Canonical>("canonical", CanonicalSchema);
export const BlockRecordModel = model<BlockRecord>("block_record", BlockRecordSchema);
export const MintPoapModel = model<MintPoap>("mint_poap", MintPoapSchema);
