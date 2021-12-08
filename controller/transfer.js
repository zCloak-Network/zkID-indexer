const TransferModel = require("../model/transfer");

async function getUserTransferRecord(dataOwner) {
  return await TransferModel.getUserTransferRecord(dataOwner);
}

module.exports = {
  getUserTransferRecord: getUserTransferRecord,
};
