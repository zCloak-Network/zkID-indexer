import { TransferModel } from "../../database/init";

async function getUserTransferRecord(dataOwner: any) {
  return new Promise((resolve, reject) => {
    console.log(dataOwner);
    TransferModel.aggregate(
      [
        {
          $match: { from: dataOwner },
        },
        {
          $lookup: {
            from: "tokens",
            localField: "tokenAddress",
            foreignField: "tokenAddress",
            as: "tokenDetails",
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
      ],
      (err: any, result: any) => {
        if (err) {
          // TODO error
        }
        resolve(result);
      }
    );
    // TransferModel.find({ dataOwner: dataOwner }, (err, result) => {
    //   if (err) {
    //     // TODO err
    //   }
    //   resolve(result);
    // });
  });
}

const Transfer = {
  getUserTransferRecord: getUserTransferRecord,
};

export default Transfer;
