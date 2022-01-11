const XHR = require("xhr2-cookies").XMLHttpRequest;
XHR.prototype._onHttpRequestError = function (request, error) {
  if (this._request !== request) {
    return;
  }
  // A new line
  console.log(error, "request");
  this._setError();
  request.abort();
  this._setReadyState(XHR.DONE);
  this._dispatchProgress("error");
  this._dispatchProgress("loadend");
};
let Web3 = require("web3");
const EventData = require("./EventData");

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
const EventDatas = require("./EventData");

function convertEventToHashMap(EventData) {
  const eventMap = new Map();
  EventData.forEach((item) => {
    // console.log(`use ${item.event} to generate hash is:`);
    const key = Web3.utils.keccak256(item.event);
    // console.log(key);
    eventMap.set(key, {
      inputs: item.inputs,
      eventModel: item.eventModel,
    });
  });
  return eventMap;
}
const eventHashMap = convertEventToHashMap(EventDatas);

let gethServer = {
  host: "45.32.73.14", // change this to your geth hostname/IP
  port: 40001, // change this to your geth RPC port
};

let firstBlockNumber = 1388965;

let maxThreads = 200;

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  console.log(
    `Connecting to geth on RPC @ ${gethServer.host}:${gethServer.port}`
  );
  // set the provider you want from Web3.providers
  web3 = new Web3(
    new Web3.providers.HttpProvider(
      `http://${gethServer.host}:${gethServer.port}`
    )
  );
}

function saveToDataBase(item) {
  // console.log(item);
  if (item && item.hasOwnProperty("logs"))
    if (item.logs.length > 0) {
      item.logs.forEach(async (it) => {
        const tp = it.topics[0];
        const zCloakContract = eventHashMap.get(tp);
        if (zCloakContract) {
          let logData = web3.eth.abi.decodeLog(
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
              newProof.save();
              break;
            case "worker_result_process":
              const rrr = new WorkerResult({
                dataOwner: logData.dataOwner.toLowerCase(),
                worker: logData.worker.toLowerCase(),
                rootHash: logData.rootHash.toLowerCase(),
                isPassed: logData.isPassed,
              });
              rrr.save();
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
              rrrv.save();
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
              trans.save();
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
              rules.save();
              break;
          }
        }
      });
    }
}

function scanTransactionCallback(txn, block) {
  web3.eth.getTransactionReceipt(txn.hash, (err, res) => {
    if (err) {
      console.log(err);
    }
    saveToDataBase(res);
  });
}

function scanBlockCallback(block) {
  const contractArr = [
    "0x72AcB0f573287B3eE0375964D220158cD18465cb",
    "0xC8e2409A0E15CBe517E178972855D486e7E881e1",
  ];

  if (block.transactions) {
    // console.log(block.transactions);
    for (var i = 0; i < block.transactions.length; i++) {
      var txn = block.transactions[i];
      if (txn.to === "0x72AcB0f573287B3eE0375964D220158cD18465cb") {
        console.log(txn.to);
        scanTransactionCallback(txn, block);
      }
    }
  }
}

function scanBlockRange(startingBlock, stoppingBlock, callback) {
  // If they didn't provide an explicit stopping block, then read
  // ALL of the blocks up to the current one.
  startingBlock = new BN(startingBlock).toNumber();
  stoppingBlock = new BN(stoppingBlock).toNumber();
  console.log(`${startingBlock} ---  ${stoppingBlock}`);
  // if (typeof stoppingBlock === "undefined") {
  //   web3.eth.getBlockNumber().then((res) => {
  //     // stoppingBlock = res;
  //     // console.log(res);
  //     scanBlockRange(startingBlock, res, callback);
  //   });
  //   console.log(stoppingBlock);
  // }

  // If they asked for a starting block that's after the stopping block,
  // that is an error (or they're waiting for more blocks to appear,
  // which hasn't yet happened).

  if (startingBlock > stoppingBlock) {
    console.log("900");
    return -1;
  }

  let blockNumber = startingBlock,
    gotError = false,
    numThreads = 0,
    startTime = new Date();
  console.log(blockNumber);
  function getPercentComplete(bn) {
    var t = stoppingBlock - startingBlock,
      n = bn - startingBlock;
    return Math.floor((n / t) * 100, 2);
  }

  function exitThread() {
    if (--numThreads == 0) {
      var numBlocksScanned = 1 + stoppingBlock - startingBlock,
        stopTime = new Date(),
        duration = (stopTime.getTime() - startTime.getTime()) / 1000,
        blocksPerSec = Math.floor(numBlocksScanned / duration, 2),
        msg = `Scanned to block ${stoppingBlock} (${numBlocksScanned} in ${duration} seconds; ${blocksPerSec} blocks/sec).`,
        len = msg.length,
        numSpaces = process.stdout.columns - len,
        spaces = Array(1 + numSpaces).join(" ");

      process.stdout.write("\r" + msg + spaces + "\n");
      if (callback) {
        callback(gotError, stoppingBlock);
      }
    }
    return numThreads;
  }

  function asyncScanNextBlock() {
    // If we've encountered an error, stop scanning blocks
    if (gotError) {
      return exitThread();
    }

    // If we've reached the end, don't scan more blocks
    if (blockNumber > stoppingBlock) {
      return exitThread();
    }

    // Scan the next block and assign a callback to scan even more
    // once that is done.
    var myBlockNumber = blockNumber++;

    // Write periodic status update so we can tell something is happening
    if (myBlockNumber % maxThreads == 0 || myBlockNumber == stoppingBlock) {
      var pctDone = getPercentComplete(myBlockNumber);
      process.stdout.write(`\rScanning block ${myBlockNumber} - ${pctDone} %`);
    }

    // Async call to getBlock() means we can run more than 1 thread
    // at a time, which is MUCH faster for scanning.

    web3.eth.getBlock(myBlockNumber, true, (error, block) => {
      if (error) {
        // Error retrieving this block
        gotError = true;
        console.error("Error:", error);
      } else {
        scanBlockCallback(block);
        asyncScanNextBlock();
      }
    });
  }

  var nt;
  for (nt = 0; nt < maxThreads && startingBlock + nt <= stoppingBlock; nt++) {
    numThreads++;
    asyncScanNextBlock();
  }
  console.log({ blockNumber });
  return nt; // number of threads spawned (they'll continue processing)
}

async function main() {
  const last = await BlockModel.find({});
  const now = await web3.eth.getBlockNumber();

  console.log(`last is ${last[last.length - 1].blockNumber}`);
  console.log(`now is ${now}`);
  if (last && last.length)
    scanBlockRange(last[last.length - 1].blockNumber, now);
  else scanBlockRange(firstBlockNumber, now);
  const dc = new BlockModel({
    blockNumber: new BN(now).toNumber(),
    blokcTime: new Date(),
  });
  await dc.save();
}

main();
