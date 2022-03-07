import Proofs from "../model/Proof";

async function getOneProof(dataOwner: string, programHash: string | any[]) {
  if (Array.isArray(programHash) && programHash.length) {
    console.log("one");
    const proofArr = [];
    for (let i = 0; i < programHash.length; i++) {
      let proofItem: any = await Proofs.getOneProof(dataOwner, programHash[i]);
      console.log(proofItem);
      if (proofItem.length) {
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

    let userProofsArr: any = await Proofs.getUserProof(dataOwner);
    if (userProofsArr.length > 0) {
      console.log(userProofsArr);
      userProofsArr.forEach((item: any) => {
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
        item.claimAlias = item.claimAlias[0].cTypeAlias;
      });
    }
    return userProofsArr;
  }
}

async function ifHaveProofs(dataOwner: string, programHash: string) {
  const proof: any = await Proofs.ifHaveProofs(dataOwner, programHash);
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

const ProofsController = {
  // getAllProofs: getAllProofs,
  getOneProof: getOneProof,
  ifHaveProofs: ifHaveProofs,
};

export default ProofsController;
