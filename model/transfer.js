const { TransferModel } = require("../Schema/init");

async function getUserTransferRecord(dataOwner) {
  return new Promise((resolve, reject) => {
    TransferModel.find({ dataOwner: dataOwner }, (err, result) => {
      if (err) {
        // TODO err
      }
      resolve(result);
    });
  });
}

module.exports = {
  getUserTransferRecord: getUserTransferRecord,
};
