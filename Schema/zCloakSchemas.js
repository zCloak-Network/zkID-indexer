const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProofsSchema = new Schema({
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
  cTypeHash: {
    type: String,
    required: true,
  },
  expectResult: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  expectResult: {
    type: Boolean,
    required: true,
  },
  rootHash: {
    type: String,
    required: true,
  },
});

const WorkerResultSchema = new Schema({
  dataOwner: {
    type: String,
    required: true,
  },
  worker: {
    type: String,
    required: true,
  },
  rootHash: {
    type: String,
    required: true,
  },
  isPassed: {
    type: Boolean,
    required: true,
  },
});

const ProgramSchema = new Schema({
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

const TransferSchema = new Schema({
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
  tranferTime: {
    type: Date,
    required: true,
  },
});

const CtypeSchema = new Schema({
  cTypeHash: {
    type: String,
    required: true,
  },

  cTypeAlias: {
    type: String,
    required: true,
  },
});

const TokenSchema = new Schema({
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
  tokenUnit: {
    type: Number,
    required: false,
  },
});
// event AddRule(address token, address checker, bytes32 cType, bytes32 programHash, bool expectedResult);

const TokenProgramRulesSchema = new Schema({
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
});

const BlockRecord = new Schema({
  blockNumber: {
    type: String,
    required: true,
  },
  blockTime: {
    type: Date,
    required: true,
  },
});

const VerifyRecord = new Schema({
  dataOwner: {
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
  isPassed: {
    type: Boolean,
    required: true,
  },
});

module.exports = {
  ProofsSchema: ProofsSchema,
  WorkerResultSchema: WorkerResultSchema,
  ProgramSchema: ProgramSchema,
  TokenSchema: TokenSchema,
  CtypeSchema: CtypeSchema,
  TransferSchema: TransferSchema,
  TokenProgramRulesSchema: TokenProgramRulesSchema,
  BlockRecordSchema: BlockRecord,
  VerifyRecordSchema: VerifyRecord,
};
