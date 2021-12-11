const { Schema } = require("mongoose");
const {
  TokenModel,
  TransferModel,
  ProofModel,
  ProgramModel,
  CtypeModel,
  WorkerResult,
  TokenProgramRulesModel,
} = require("./init");

const proof = new ProofModel({
  dataOwner: "0x2292b5DBC7fdCdb6F9aBF93F56774Bfe0b2DDcD7",
  kiltAddress: "4tXisxG6wr9bm2ZRxVLyZkzfzq17HTq4PYzL3WXy9HmEzs67",
  ctypeHash:
    "0x7f2ef721b292b9b7d678e9f82ab010e139600558df805bbc61a0041e60b61a18",
  programHash:
    "0x7f2ef721b292b9b7d678e9f82ab010e139600558df805bbc61a0041e60b61a18",
  fieldName: "age",
  proofCid: "Qmcrbd9Jap67Qzgum1uZ15vL7KngCSYt6q5RqQGhvSeq4r",
  rootHash:
    "0x945c55d70ea04f72f731c2d8a21a1aef7f2a347d1b7e29621ef4ff2c5c1a5003",
  expectResult: true,
  date: new Date(),
});

proof.save((err, res) => {
  if (err) throw err;
  console.log(res);
});

const proofStatus = new WorkerResult({
  dataOwner: "0x2292b5DBC7fdCdb6F9aBF93F56774Bfe0b2DDcD7",
  verifyResult: true,
  workerMessage: [],
  passedTimes: 2,
  ifFinishVerify: false,
  proofCid: "Qmcrbd9Jap67Qzgum1uZ15vL7KngCSYt6q5RqQGhvSeq4r",
});
proofStatus.save((err, res) => {
  if (err) throw err;
  console.log(res);
});

// const token1 = new TokenModel({
//   tokenName: "token1",
//   tokenAddress: "223432432",
//   tokenImageUrl: "http://localhost:8080/eth_logo.svg",
// });

// token1.save((err, res) => {
//   if (err) throw err;
//   console.log(res);
// });

// const ctype1 = new CtypeModel({
//   ctypeAlias: "zCloak Primary Access",
//   ctypeHash:
//     "0x7f2ef721b292b9b7d678e9f82ab010e139600558df805bbc61a0041e60b61a18",
// });

// ctype1.save((err, res) => {
//   if (err) throw err;
//   console.log(res);
// });

// const transfer1 = new TransferModel({
//   tokenAddress: "0x8979798798797987887",
//   from: "0x2292b5DBC7fdCdb6F9aBF93F56774Bfe0b2DDcD7",
//   to: "0x2292b5DBC7fdCdb6F9aBF93F56774Bfe0b2DDcD7",
//   amount: 100,
//   programHash:
//     "0x597385e16c8d95ab5f38e377d8f9d002de71d43ac8251e3532a1deed5a03ecfd",
// });

// transfer1.save((err, res) => {
//   if (err) throw err;
//   console.log(res);
// });

// const p1 = new ProgramModel({
//   programHashName: "X1,Age,Range,LargeThan 20",
//   programHash:
//     "0x597385e16c8d95ab5f38e377d8f9d002de71d43ac8251e3532a1deed5a03ecfd",
//   programFieldName: "age",
//   ctypeHash:
//     "0x7f2ef721b292b9b7d678e9f82ab010e139600558df805bbc61a0041e60b61a18",
//   programDetail: "begin read.a gt.128 end",
// });
// p1.save((err, res) => {
//   if (err) throw err;
//   console.log(res);
// });

// const tp1 = new TokenProgramRulesModel({
//   tokenAddress: "223432432",
//   ctypeHash:
//     "0x7f2ef721b292b9b7d678e9f82ab010e139600558df805bbc61a0041e60b61a18",
//   programHash:
//     "0x597385e16c8d95ab5f38e377d8f9d002de71d43ac8251e3532a1deed5a03ecfd",
// });

// tp1.save((err, res) => {
//   if (err) throw err;
//   console.log(res);
// });
