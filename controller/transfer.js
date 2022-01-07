const TransferModel = require("../model/transfer");

async function getUserTransferRecord(dataOwner) {
  const transferData = await TransferModel.getUserTransferRecord(dataOwner);
  if (transferData.length) {
    transferData.forEach((item) => {
      item.tokenDetails = item.tokenDetails[0];
      item.programDetails = item.programDetails[0];
    });
  }
  return transferData;
}

module.exports = {
  getUserTransferRecord: getUserTransferRecord,
};
