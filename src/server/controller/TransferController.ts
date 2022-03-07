const TransferModel = require("../model/transfer");

async function getUserTransferRecord(dataOwner: any) {
  const transferData = await TransferModel.getUserTransferRecord(dataOwner);
  if (transferData.length) {
    transferData.forEach(
      (item: { tokenDetails: any[]; programDetails: any[] }) => {
        item.tokenDetails = item.tokenDetails[0];
        item.programDetails = item.programDetails[0];
      }
    );
  }
  return transferData;
}

const TransferController = {
  getUserTransferRecord: getUserTransferRecord,
};

export default TransferController;
