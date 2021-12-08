const Proofs = require("../model/proof");

async function getAllProofs() {
  return await Proofs.getAllProofs();
}

async function getOneProof(dataOwner, proofCid) {
  if (Array.isArray(proofCid) && proofCid.length) {
    const proofArr = [];
    for (let i = 0; i < proofCid.length; i++) {
      let proofItem = await Proofs.getOneProof(dataOwner, proofCid[i]);
      proofItem[0].status = proofItem[0].status[0];
      proofArr.push(proofItem[0]);
    }
    return proofArr;
  } else {
    let userProofsArr = await Proofs.getUserProof(dataOwner);
    if (userProofsArr.length > 0) {
      userProofsArr.forEach((item) => {
        item.status = item.status[0];
      });
    }
    return userProofsArr;
  }
}

async function ifHaveProofs(dataOwner, programHash) {
  const proof = await Proofs.ifHaveProofs(dataOwner, programHash);
  if (proof.length > 0) {
    proof[0].status = proof[0].status[0];
  }
  return proof;
}

module.exports = {
  getAllProofs: getAllProofs,
  getOneProof: getOneProof,
  ifHaveProofs: ifHaveProofs,
};
