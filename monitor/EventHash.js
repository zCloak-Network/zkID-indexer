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
const EventData = require("./EventData");
var w3 = new web3("http://45.32.73.14:40001/");

const conArr = [
  "0x72AcB0f573287B3eE0375964D220158cD18465cb",
  "0xC8e2409A0E15CBe517E178972855D486e7E881e1",
];

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
  const oneBlock = await w3.eth.getBlock(blockNumber, true);
  if (oneBlock && oneBlock.transactions && oneBlock.transactions.length) {
    // console.log(oneBlock);
    const transactions = oneBlock.transactions;
    console.log(transactions[0].blockNumber);
    for (i = 0; i < transactions.length; i++) {
      // console.log(transactions[i].blockNumber);
      if (conArr.indexOf(transactions[i].to) !== -1) {
        const items = await queryTransaction(transactions[i].hash);
        await saveData(items);
      }
      // const items = await queryTransaction(transactions[i]);
      // await saveData(items);
    }
  }
}

async function saveData(item) {
  // console.log(eventHashMap);
  const eventHashMap = convertEventToHashMap(EventData);

  // transactionsDetails.forEach(async (item) => {
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
            console.log("proof save to database");
            const newProof = new ProofModel({
              dataOwner: logData.dataOwner.toLowerCase(),
              kiltAddress: logData.kiltAddress.toLowerCase(),
              cTypeHash: logData.cType.toLowerCase(),
              programHash: logData.programHash.toLowerCase(),
              fieldName: logData.fieldName.toLowerCase(),
              proofCid: logData.proofCid,
              rootHash: logData.rootHash.toLowerCase(),
              expectResult: logData.expectResult,
              date: new Date(),
            });
            await newProof.save();
            break;
          case "worker_result_process":
            const rrr = new WorkerResult({
              dataOwner: logData.dataOwner.toLowerCase(),
              worker: logData.worker.toLowerCase(),
              rootHash: logData.rootHash.toLowerCase(),
              isPassed: logData.isPassed,
            });
            await rrr.save();
            console.log("AddVerification save to database");
            break;
          case "worker_result_done":
            console.log("worker_result_done save to database");
            const rrrv = new VerifyRecordModel({
              dataOwner: logData.dataOwner.toLowerCase(),
              cTypeHash: logData.cType.toLowerCase(),
              programHash: logData.programHash.toLowerCase(),
              isPassed: logData.isPassed,
            });
            await rrrv.save();
            break;
          case "token":
            break;
          case "transfers":
            // event RTransfer(address token, address from, address to, uint256 amount, bytes32 programHash);
            const trans = new TransferModel({
              tokenAddress: logData.token.toLowerCase(),
              from: logData.from.toLowerCase(),
              to: logData.to.toLowerCase(),
              amount: logData.amount,
              programHash: logData.programHash.toLowerCase(),
              tranferTime: new Date(),
            });
            await trans.save();
            break;
          case "program":
            break;
          case "token_program_rules":
            console.log("save token_program_rules in database");
            // event AddRule(address token, address checker, bytes32 cType, bytes32 programHash, bool expectedResult);
            const rules = new TokenProgramRulesModel({
              tokenAddress: logData.token.toLowerCase(),
              checker: logData.checker.toLowerCase(),
              expectedResult: logData.expectedResult,
              cTypeHash: logData.cType.toLowerCase(),
              programHash: logData.programHash.toLowerCase(),
            });
            await rules.save();
            break;
        }
      }
    });
  }
  // });
}

async function queryTransaction(c) {
  var json = await w3.eth.getTransactionReceipt(c);
  // console.log(json);
  return json;
}

async function scan() {
  // let blocks = [];
  const dataRecord = await BlockModel.find();
  if (dataRecord.length === 0) {
    const nb = new BlockModel({
      blockNumber: "1340000",
      blockTime: new Date(),
    });
    await nb.save();
    scan();
  }
  const lastNumber = dataRecord[dataRecord.length - 1].blockNumber;
  const lastNumberBN = new BN(lastNumber);
  console.log("lastt");
  console.log(lastNumberBN.toNumber());
  const blockNumberNow = await w3.eth.getBlockNumber();
  console.log("now");
  console.log(blockNumberNow);
  let i;
  for (i = lastNumberBN.toNumber(); i <= blockNumberNow; i++) {
    // blocks.push(queryOneBlockTransaction(i));
    // console.log(`now scaning  --->  ${i}`);
    await queryOneBlockTransaction(i);
  }
  // blocks.push(queryOneBlockTransaction(1338546));
  const newBlockNumberRec = new BlockModel({
    blockNumber: i,
    blockTime: new Date(),
  });
  console.log("save record to database");
  await newBlockNumberRec.save();
  setTimeout(scan, 2 * 6000);
}
scan();

// setInterval(scan, 6000 * 2);
// console.log(convertEventToHashMap(EventData));
