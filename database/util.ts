import { AddProofModel, VerifyingModel, CanonicalModel, MintPoapModel, BlockRecordModel } from "./init";
import { AddProof, Verifying, Canonical, MintPoap } from "./types";

export async function saveAddProof(
  data: AddProof,
  blockNumber: number,
  transactionHash: string,
  blockHash: string,
  blockTime: number
) {
  data.blockNumber = blockNumber;
  data.transactionHash = transactionHash;
  data.blockHash = blockHash;
  data.blockTime = blockTime;

  const proof = new AddProofModel(data);
  await proof.save().then((res) => {
    console.log(`save to AddProof\ndata: ${JSON.stringify(res)}`);
  });
}

export async function saveVerifying(
  data: Verifying,
  blockNumber: number,
  transactionHash: string,
  blockHash: string,
  blockTime: number
) {
  data.blockNumber = blockNumber;
  data.transactionHash = transactionHash;
  data.blockHash = blockHash;
  data.blockTime = blockTime;

  const verifying = new VerifyingModel(data);
  await verifying.save().then((res) => {
    console.log(`save to Verifying\ndata: ${JSON.stringify(res)}`);
  });
}

export async function saveCanonical(
  data: Canonical,
  blockNumber: number,
  transactionHash: string,
  blockHash: string,
  blockTime: number
) {
  data.blockNumber = blockNumber;
  data.transactionHash = transactionHash;
  data.blockHash = blockHash;
  data.blockTime = blockTime;

  const canonical = new CanonicalModel(data);
  await canonical.save().then((res) => {
    console.log(`save to Canonical\ndata: ${JSON.stringify(res)}`);
  });
}

export async function saveMintPoap(
  data: MintPoap,
  blockNumber: number,
  transactionHash: string,
  blockHash: string,
  blockTime: number
) {
  data.blockNumber = blockNumber;
  data.transactionHash = transactionHash;
  data.blockHash = blockHash;
  data.blockTime = blockTime;

  const mintPoap = new MintPoapModel(data);
  await mintPoap.save().then((res) => {
    console.log(`save to MintPoap\ndata: ${JSON.stringify(res)}`);
  });
}

export async function saveBestBlockNumber(blockNumber: number) {
  const block_record = new BlockRecordModel({
    blockNumber: blockNumber + 1,
    blockType: "best",
  });
  await block_record.save();
}

export async function getLastBestBlockNumber(): Promise<number> {
  const dataRecord = await BlockRecordModel.find();
  if (dataRecord.length === 0) return 0;
  return dataRecord[dataRecord.length - 1].blockNumber;
}
