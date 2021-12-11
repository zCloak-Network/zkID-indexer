const { TransferModel } = require("../Schema/init");

async function getUserTransferRecord(dataOwner) {
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
      (err, result) => {
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

module.exports = {
  getUserTransferRecord: getUserTransferRecord,
};
