const Proofs = require("../model/proof");

async function getAllProofs() {
  return await Proofs.getAllProofs();
}

async function getOneProof(dataOwner, proofCid) {
  if (Array.isArray(proofCid) && proofCid.length) {
    const proofArr = [];
    for (let i = 0; i < proofCid.length; i++) {
      let proofItem = await Proofs.getOneProof(dataOwner, proofCid[i]);
      if (proofItem[0].status) {
        proofItem[0].status = proofItem[0].status[0];
      }
      if (proofItem[0].programDetails) {
        proofItem[0].programDetails = proofItem[0].programDetails[0];
      }
      if (proofItem[0].claimAlias[0].claimAlias) {
        proofItem[0].claimAlias = proofItem[0].claimAlias[0].claimAlias;
      }
      proofArr.push(proofItem[0]);
    }
    return proofArr;
  } else {
    let userProofsArr = await Proofs.getUserProof(dataOwner);
    if (userProofsArr.length > 0) {
      console.log(userProofsArr);
      userProofsArr.forEach((item) => {
        item.status = item.status[0];
        item.programDetails = item.programDetails[0];
        item.claimAlias = item.claimAlias[0].claimAlias;
        item.claimAlias = item.claimAlias[0];
      });
    }
    return userProofsArr;
  }
}

async function ifHaveProofs(dataOwner, programHash) {
  const proof = await Proofs.ifHaveProofs(dataOwner, programHash);
  if (proof.length > 0) {
    proof[0].status = proof[0].status[0];
    proof[0].programDetails = proof[0].programDetails[0];
    return proof[0];
  }
  return proof;
}

module.exports = {
  getAllProofs: getAllProofs,
  getOneProof: getOneProof,
  ifHaveProofs: ifHaveProofs,
};
