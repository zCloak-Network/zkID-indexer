import { Schema, connect, model } from "mongoose";
import {
  BlockRecord,
  BlockRecordDelete,
  Ctype,
  Program,
  Proofs,
  Token,
  TokenProgramRules,
  Transfer,
  VerifyRecord,
} from "./types";

const BlockRecordSchema = new Schema<BlockRecord>({
  blockNumber: {
    type: Number,
    required: true,
  },
  blockHash: {
    type: String,
    required: true,
  },
  blockType: {
    type: String,
    required: true,
  },
  blockTime: {
    type: String,
    required: true,
  },
});

const BlockRecordDeleteSchema = new Schema<BlockRecordDelete>({
  blockNumber: {
    type: Number,
    required: true,
  },
  blockHash: {
    type: String,
    required: true,
  },
  blockType: {
    type: String,
    required: true,
  },
  blockTime: {
    type: String,
    required: true,
  },
});

const ProofsSchema = new Schema<Proofs>({
  blockNumber: {
    type: Number,
    required: false,
  },
  cType: {
    type: String,
    required: false,
  },

  blockHash: {
    type: String,
    required: false,
  },
  dataOwner: {
    type: String,
    required: true,
  },
  kiltAddress: {
    type: String,
    required: true,
  },
  cTypeHash: {
    type: String,
    required: true,
  },
  programHash: {
    type: String,
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
  },
  proofCid: {
    type: String,
    required: true,
  },
  expectResult: {
    type: Boolean,
    required: true,
  },
  blockTime: {
    type: String,
    required: false,
  },
  rootHash: {
    type: String,
    required: true,
  },
});

// const WorkerResultSchema = new Schema({
//   dataOwner: {
//     type: String,
//     required: true,
//   },
//   cTypeHash: {
//     type: String,
//     required: false,
//   },
//   programHash: {
//     type: String,
//     required: false,
//   },
//   verifyResult: {
//     type: Boolean,
//     required: true,
//   },
//   workerMessage: {
//     type: Array,
//     required: true,
//   },
//   passedTimes: {
//     type: Number,
//     required: true,
//   },
//   ifFinishVerify: {
//     type: Boolean,
//     required: true,
//   },
// });

const TokenProgramRulesSchema = new Schema<TokenProgramRules>({
  blockNumber: {
    type: Number,
    required: false,
  },
  blockHash: {
    type: String,
    required: false,
  },
  tokenAddress: {
    type: String,
    required: true,
  },
  checker: {
    type: String,
    required: false,
  },
  expectedResult: {
    type: Boolean,
    required: false,
  },
  cTypeHash: {
    type: String,
    required: true,
  },
  programHash: {
    type: String,
    required: true,
  },
  blockTime: {
    type: String,
    required: false,
  },
});

const TokenSchema = new Schema<Token>({
  tokenAddress: {
    type: String,
    required: true,
  },
  tokenName: {
    type: String,
    required: true,
  },
  tokenImageUrl: {
    type: String,
    required: true,
  },
});

const TransferSchema = new Schema<Transfer>({
  blockNumber: {
    type: Number,
    required: false,
  },
  blockHash: {
    type: String,
    required: false,
  },
  tokenAddress: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  programHash: {
    type: String,
    required: true,
  },
  blockTime: {
    type: String,
    required: false,
  },
});

const VerifyRecordSchema = new Schema<VerifyRecord>({
  blockNumber: {
    type: Number,
    required: false,
  },
  blockHash: {
    type: String,
    required: false,
  },
  dataOwner: {
    type: String,
    required: true,
  },
  blockTime: {
    type: String,
    required: false,
  },
  rootHash: {
    type: String,
    required: true,
  },
  isPassed: { type: Boolean, required: true },
});

const ProgramSchema = new Schema<Program>({
  programHash: {
    type: String,
    required: true,
  },
  programDetail: {
    type: String,
    required: true,
  },
  cTypeHash: {
    type: String,
    required: true,
  },
  programFieldName: {
    type: String,
    required: true,
  },
  programHashName: {
    type: String,
    required: true,
  },
});

const CtypeSchema = new Schema<Ctype>({
  cTypeHash: {
    type: String,
    required: true,
  },
  cTypeAlias: {
    type: String,
    required: true,
  },
});

(async () => {
  await connect("mongodb://127.0.0.1:2888/zCloak")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
})();
export const ProofModel = model<Proofs>("proofs", ProofsSchema);
export const BlockRecordModel = model<BlockRecord>(
  "block_record",
  BlockRecordSchema
);
export const BlockRecordDeleteModel = model<BlockRecordDelete>(
  "block_record_delete",
  BlockRecordDeleteSchema
);
export const TokenProgramRulesModel = model<TokenProgramRules>(
  "token_program_rules",
  TokenProgramRulesSchema
);
export const TokenModel = model<Token>("token", TokenSchema);
export const TransferModel = model<Transfer>("transfer", TransferSchema);
export const VerifyRecordModel = model<VerifyRecord>(
  "verify",
  VerifyRecordSchema
);
export const ProgramModel = model<Program>("program", ProgramSchema);
export const CtypeModel = model<Ctype>("ctype", CtypeSchema);
