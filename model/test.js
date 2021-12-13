// const { ProofModel } = require("../Schema/init");

// ProofModel.aggregate(
//   [
//     {
//       $match: { dataOwner: "0x6f56c250992655f9ca83e3246dcbdc9555a6771f" },
//     },
//     {
//       $lookup: {
//         from: "verifies",
//         localField: "programHash",
//         foreignField: "programHash",
//         as: "status",
//       },
//     },
//     {
//       $lookup: {
//         from: "programs",
//         localField: "programHash",
//         foreignField: "programHash",
//         as: "programDetails",
//       },
//     },
//     {
//       $lookup: {
//         from: "ctypes",
//         localField: "cTypeHash",
//         foreignField: "cTypeHash",
//         as: "claimAlias",
//       },
//     },
//   ],
//   (err, result) => {
//     if (err) {
//       // TODO error
//     }
//     console.log(result);
//     // resolve(result);
//   }
// );



const web3 = require("web3");
const BN = require("bn.js");

const {
  BlockModel,
  ProofModel,
  TokenModel,
  TokenProgramRulesModel,
  ProgramModel,
  WorkerResult,
  VerifyRecordModel,
  TransferModel,
} = require("../Schema/init");
const EventData = require("../monitor/EventData");
var w3 = new web3("ws://45.32.73.14:40002/");

function convertEventToHashMap(EventData) {
  const eventMap = new Map();
  EventData.forEach((item) => {
    // console.log(`use ${item.event} to generate hash is:`);
    const key = web3.utils.keccak256(item.event);
    // console.log(key);
    eventMap.set(key, {
      inputs: item.inputs,
      eventModel: item.eventModel,
    });
  });
  return eventMap;
}
// 1343600
async function queryOneBlockTransaction(blockNumber) {
  const oneBlock = await w3.eth.getBlock(blockNumber);
  const transactions = oneBlock.transactions;
  const transactionsDetails = [];
  for (i = 0; i < transactions.length; i++) {
    transactionsDetails.push(queryTransaction(transactions[i]));
  }
  const trs = await Promise.all(transactionsDetails);
  await saveData(trs);
  // return trs;
}

async function saveData(transactionsDetails) {
  // console.log(eventHashMap);
  const eventHashMap = convertEventToHashMap(EventData);

  transactionsDetails.forEach(async (item) => {
    // console.log(item);

    if (item.logs.length > 0) {
      item.logs.forEach(async (it) => {
        const tp = it.topics[0];
        const zCloakContract = eventHashMap.get(tp);
        if (zCloakContract) {
          let logData = await w3.eth.abi.decodeLog(
            zCloakContract.inputs,
            it.data,
            it.topics
          );
          logData = JSON.parse(JSON.stringify(logData));
          console.log(logData);
          switch (zCloakContract.eventModel) {
            case "proofs":
              // console.log("proof save to database");
              // const newProof = new ProofModel({
              //   dataOwner: logData.dataOwner.toLowerCase(),
              //   kiltAddress: logData.kiltAddress,
              //   cTypeHash: logData.cType,
              //   programHash: logData.programHash.toLowerCase(),
              //   fieldName: logData.fieldName,
              //   proofCid: logData.proofCid,
              //   rootHash: logData.rootHash,
              //   expectResult: logData.expectResult,
              //   date: new Date(),
              // });
              // await newProof.save();
              // break;
            case "worker_result_process":
              // 若没有,则添加,若有则修改
              // 读取proofs表, 读出proof ,添加proof的关键信息  然后
              // const cc = WorkerResult.findOneAndUpdate(
              //   {},
              //   {},
              //   { upsert: true, new: true, setDefaultsOnInsert: true }
              // );
              break;
            case "worker_result_done":
              console.log("worker_result_done save to database");

              const rrr = new VerifyRecordModel({
                dataOwner: logData.dataOwner.toLowerCase(),
                cTypeHash: logData.cType,
                programHash: logData.programHash,
                isPassed: logData.isPassed,
              });
              await rrr.save();
              break;
            // case "token":
            //   break;
            // case "transfer":
            //   // event RTransfer(address token, address from, address to, uint256 amount, bytes32 programHash);
            //   const trans = new TransferModel({
            //     tokenAddress: logData.token,
            //     from: logData.from,
            //     to: logData.to,
            //     amount: logData.amount,
            //     programHash: logData.programHash.toLowerCase(),
            //     tranferTime: new Date(),
            //   });
            //   await trans.save();
            //   break;
            // case "program":
            //   break;
            // case "token_program_rules":
            //   console.log("save token_program_rules in database");
            //   // event AddRule(address token, address checker, bytes32 cType, bytes32 programHash, bool expectedResult);
            //   const rules = new TokenProgramRulesModel({
            //     tokenAddress: logData.token.toLowerCase(),
            //     checker: logData.checker,
            //     expectedResult: logData.expectedResult,
            //     cTypeHash: logData.cType,
            //     programHash: logData.programHash.toLowerCase(),
            //   });
            //   await rules.save();
            //   break;
          }
        }
      });
    }
  });
}

async function queryTransaction(c) {
  if (
    c === "0xdc11fe1ee9dd0eec577b2fa35387ba33109fcb155b9463e5e4a1b8aa29d4ed98"
  ) {
    console.log("yes");
    console.log("yes");
    console.log("yes");
    console.log("yes");
    console.log("yes");
    console.log("yes");
    console.log("yes");
    // return
  }
  var json = await w3.eth.getTransactionReceipt(c);
  // console.log({ json });
  return json;
}

async function scan() {
  let blocks = [];
  const dataRecord = await BlockModel.find();
  const lastNumber = dataRecord[dataRecord.length - 1].blockNumber;
  const lastNumberBN = new BN(lastNumber);
  console.log("lastt");
  console.log(lastNumberBN.toNumber());
  const blockNumberNow = await w3.eth.getBlockNumber();
  console.log("now");
  console.log(blockNumberNow);
  let i;
  for (i = 1344029; i < blockNumberNow; i++) {
    blocks.push(queryOneBlockTransaction(i));
  }
  // blocks.push(queryOneBlockTransaction(1338546));
  const newBlockNumberRec = new BlockModel({
    blockNumber: i,
    blockTime: new Date(),
  });
  console.log("save record to database");
  await newBlockNumberRec.save();
  const data = await Promise.all(blocks);
  // console.log(data);
}
// scan();

setInterval(scan, 6000 * 2);
// console.log(convertEventToHashMap(EventData));

