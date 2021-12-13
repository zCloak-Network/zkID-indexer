const Proofs = require("../model/proof");

async function getAllProofs() {
  return await Proofs.getAllProofs();
}

async function getOneProof(dataOwner, programHash) {
  if (Array.isArray(programHash) && programHash.length) {
    console.log("one");
    const proofArr = [];
    for (let i = 0; i < programHash.length; i++) {
      let proofItem = await Proofs.getOneProof(dataOwner, programHash[i]);
      console.log(proofItem[0].status);
      if (proofItem[0].status.length) {
        const sstatus = proofItem[0].status[0];
        if (sstatus.isPassed) {
          proofItem[0].status = "Verified True";
        } else {
          proofItem[0].status = "Verified False";
        }
      } else {
        proofItem[0].status = "Verifing";
      }
      if (proofItem[0].programDetails) {
        proofItem[0].programDetails = proofItem[0].programDetails[0];
      }
      if (proofItem[0].claimAlias[0]) {
        proofItem[0].claimAlias = "zCloak Primary Access";
      }
      proofArr.push(proofItem[0]);
    }
    return proofArr;
  } else {
    console.log("all");

    let userProofsArr = await Proofs.getUserProof(dataOwner);
    if (userProofsArr.length > 0) {
      console.log(userProofsArr);
      userProofsArr.forEach((item) => {
        console.log(item.status);

        if (item.status.length) {
          const sstatus = item.status[0];
          if (sstatus.isPassed) {
            item.status = "Verified True";
          } else {
            item.status = "Verified False";
          }
        } else {
          item.status = "Verifing";
        }

        // item.status = item.status[0];
        item.programDetails = item.programDetails[0];
        item.claimAlias = "zCloak Primary Access";
      });
    }
    return userProofsArr;
  }
}

async function ifHaveProofs(dataOwner, programHash) {
  const proof = await Proofs.ifHaveProofs(dataOwner, programHash);
  if (proof.length > 0) {
    // proof[0].status = proof[0].status[0];

    if (proof[0].status.length) {
      const sstatus = proof[0].status[0];
      if (sstatus.isPassed) {
        proof[0].status = "Verified True";
      } else {
        proof[0].status = "Verified False";
      }
    } else {
      proof[0].status = "Verifing";
    }

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
