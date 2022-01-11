const Proofs = require("../model/proof");

async function getAllProofs() {
  return await Proofs.getAllProofs();
}

async function getOneProof(dataOwner, programHash) {
  if (Array.isArray(programHash) && programHash.length) {
    // console.log("one");
    const proofArr = [];
    for (let i = 0; i < programHash.length; i++) {
      let proofItem = await Proofs.getOneProof(dataOwner, programHash[i]);

      // console.log(proofItem);

      if (proofItem.length) {
        const percent = await getUserProofPercent(
          proofItem[0].dataOwner,
          proofItem[0].rootHash
        );
        proofItem[0].percent = percent;
        if (proofItem[0].status && proofItem[0].status.length) {
          const sstatus = proofItem[0].status[0];
          proofItem[0].claimAlias = proofItem[0].claimAlias[0].cTypeAlias;
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
        console.log(proofItem[0].claimAlias);

        proofItem[0].claimAlias = proofItem[0].claimAlias[0].cTypeAlias;
        proofArr.push(proofItem[0]);
      }
    }
    return proofArr;
  } else {
    console.log("all");

    let userProofsArr = await Proofs.getUserProof(dataOwner);
    if (userProofsArr.length > 0) {
      // console.log(userProofsArr);

      for (let i = 0; i < userProofsArr.length; i++) {
        const item = userProofsArr[i];
        const percent = await getUserProofPercent(
          item.dataOwner,
          item.rootHash
        );
        item.percent = percent;
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

        item.programDetails = item.programDetails[0];
        item.claimAlias = item.claimAlias[0].cTypeAlias;
      }

      // userProofsArr.forEach((item) => {
      //   // console.log(item.status);
      // });
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

async function getUserProofPercent(dataOwner, rootHash) {
  const percent = await Proofs.getUserProofPercent(dataOwner, rootHash);
  // console.log(percent);
  return (percent.length / 3).toFixed(2);
}

module.exports = {
  getAllProofs: getAllProofs,
  getOneProof: getOneProof,
  ifHaveProofs: ifHaveProofs,
  getUserProofPercent: getUserProofPercent,
};
