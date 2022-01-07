// const dbCommon = require("../Schema/common");
const { ProofModel, WorkerResult } = require("../Schema/init");

/**
 *
 * Get a proof owned by an address
 * @param {*} dataOwner
 * @return {*}
 */
async function getUserProof(dataOwner) {
  return new Promise((resolve, reject) => {
    ProofModel.aggregate(
      [
        {
          $match: { dataOwner: dataOwner },
        },
        {
          $lookup: {
            from: "verifies",
            localField: "dataOwner",
            foreignField: "dataOwner",
            as: "status",
          },
        },
        {
          $lookup: {
            from: "programs",
            localField: "programHash",
            foreignField: "programHash",
            as: "programDetails",
          },
        },
        {
          $lookup: {
            from: "ctypes",
            localField: "cTypeHash",
            foreignField: "cTypeHash",
            as: "claimAlias",
          },
        },
      ],
      (err, result) => {
        if (err) {
          // TODO error
        }
        resolve(result);
      }
    );
  });
}

/**
 *
 * Get a single proof under an address
 * @param {*} dataOwner
 * @param {*} proofCid
 * @return {Array}
 */
async function getOneProof(dataOwner, programHash) {
  return new Promise((resolve, reject) => {
    ProofModel.aggregate(
      [
        {
          $match: { programHash: programHash, dataOwner: dataOwner },
        },
        {
          $lookup: {
            from: "verifies",
            localField: "dataOwner",
            foreignField: "dataOwner",
            as: "status",
          },
        },
        {
          $lookup: {
            from: "programs",
            localField: "programHash",
            foreignField: "programHash",
            as: "programDetails",
          },
        },
        {
          $lookup: {
            from: "ctypes",
            localField: "cTypeHash",
            foreignField: "cTypeHash",
            as: "claimAlias",
          },
        },
      ],
      (err, result) => {
        if (err) {
          // TODO deal log later
          // 手动抛出错误记录日志,有助于bug排查
        }
        resolve(result);
      }
    );
  });
}

async function ifHaveProofs(dataOwner, programHash) {
  return new Promise((resolve, reject) => {
    ProofModel.aggregate(
      [
        {
          $match: { programHash: programHash, dataOwner: dataOwner },
        },
        {
          $lookup: {
            from: "verifies",
            localField: "programHash",
            foreignField: "programHash",
            as: "status",
          },
        },
        {
          $lookup: {
            from: "programs",
            localField: "programHash",
            foreignField: "programHash",
            as: "programDetails",
          },
        },
        { $limit: 1 },
      ],
      (err, result) => {
        if (err) {
          // TODO err
        }
        resolve(result);
      }
    );
  });
}

async function getUserTransferPercent(dataOwner, rootHash) {
  return new Promise((resolve, reject) => {
    WorkerResult.find(
      { dataOwner: dataOwner, rootHash: rootHash },
      (err, result) => {
        if (err) {
        }
        resolve(result);
      }
    );
  });
}

module.exports = {
  getOneProof: getOneProof,
  getUserProof: getUserProof,
  ifHaveProofs: ifHaveProofs,
  getUserTransferPercent: getUserTransferPercent,
};
