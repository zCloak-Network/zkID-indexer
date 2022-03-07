import { ProofModel } from "../../database/init";
import { Proofs } from "../../database/types";

// /**
//  *
//  * Get a proof owned by an address
//  * @param {*} dataOwner
//  * @return {*}
//  */
// async function getUserProof(dataOwner: string) {
//   return new Promise((resolve, reject) => {

//     ProofModel.aggregate(
//       [
//         {
//           $match: { dataOwner: dataOwner },
//         },
//         {
//           $lookup: {
//             from: "verifies",
//             localField: "dataOwner",
//             foreignField: "dataOwner",
//             as: "status",
//           },
//         },
//         {
//           $lookup: {
//             from: "programs",
//             localField: "programHash",
//             foreignField: "programHash",
//             as: "programDetails",
//           },
//         },
//         {
//           $lookup: {
//             from: "ctype",
//             localField: "cTypeHash",
//             foreignField: "cTypeHash",
//             as: "claimAlias",
//           },
//         },
//       ],
//       (err: Error, result: any) => {
//         if (err) {
//           // TODO error
//         }
//         resolve(result);
//       }
//     );
//   });
// }

// /**
//  *
//  * Get a single proof under an address
//  * @param {*} dataOwner
//  * @param {*} proofCid
//  * @return {Array}
//  */
// async function getOneProof(dataOwner: string, programHash: string) {
//   return new Promise((resolve, reject) => {
//     ProofModel.aggregate(
//       [
//         {
//           $match: { programHash: programHash, dataOwner: dataOwner },
//         },
//         {
//           $lookup: {
//             from: "verifies",
//             localField: "dataOwner",
//             foreignField: "dataOwner",
//             as: "status",
//           },
//         },
//         {
//           $lookup: {
//             from: "programs",
//             localField: "cTypeHash",
//             foreignField: "cTypeHash",
//             as: "programDetails",
//           },
//         },
//         {
//           $lookup: {
//             from: "ctypes",
//             localField: "cTypeHash",
//             foreignField: "cTypeHash",
//             as: "claimAlias",
//           },
//         },
//       ],
//       (err: any, result: any) => {
//         if (err) {
//           // TODO deal log later
//           // 手动抛出错误记录日志,有助于bug排查
//         }
//         resolve(result);
//       }
//     );
//   });
// }

// async function ifHaveProofs(dataOwner: string, programHash: string) {
//   return new Promise((resolve, reject) => {
//     ProofModel.aggregate(
//       [
//         {
//           $match: { programHash: programHash, dataOwner: dataOwner },
//         },
//         {
//           $lookup: {
//             from: "verifies",
//             localField: "programHash",
//             foreignField: "programHash",
//             as: "status",
//           },
//         },
//         {
//           $lookup: {
//             from: "programs",
//             localField: "programHash",
//             foreignField: "programHash",
//             as: "programDetails",
//           },
//         },
//         { $limit: 1 },
//       ],
//       (err: any, result: any) => {
//         if (err) {
//           // TODO err
//         }
//         resolve(result);
//       }
//     );
//   });
// }

async function getOneProof(
  dataOwner: string,
  programHash: string
): Promise<Proofs | null> {
  return await ProofModel.findOne({
    dataOwner: dataOwner,
    programHash: programHash,
  });
}

async function getOneUserProofs(
  dataOwner: string,
  programHash: string
): Promise<Proofs[]> {
  return await ProofModel.find({
    dataOwner: dataOwner,
    programHash: programHash,
  });
}

const Proofs = {
  getOneProof: getOneProof,
  getOneUserProofs: getOneUserProofs,
};

export default Proofs;
