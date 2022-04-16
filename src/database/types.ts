import { Model } from "mongoose";

export interface AddProof {
  blockNumber?: number;
  blockHash?: string;
  transactionHash?: string;

  dataOwner: string;
  attester: string;
  cType: string;
  programHash: string;
  fieldNames: Array<string>;
  proofCid: string;
  requestHash: string;
  rootHash: string;
  expectResult: Array<number>;
}
export interface Verifying {
  blockNumber?: number;
  blockHash?: string;
  transactionHash?: string;

  cOwner: string;
  requestHash: string;
  worker: string;
  outputHash: string;
  rootHash: string;
  attester: string;
  isPassed: boolean;
  calcResult: Array<number>;
}

export interface Canonical {
  blockNumber?: number;
  blockHash?: string;
  transactionHash?: string;

  cOwner: string;
  requestHash: string;
  outputHash: string;
}

export interface BlockRecord {
  blockNumber: number;
  blockHash?: string;
  blockType: string;
}

// export interface BlockRecordDelete {
//   blockNumber: number;
//   blockHash: string;
//   blockType: string;
//   blockTime: string;
// }

export interface MintPoap {
  poapId: string;
  who: string;
  nftId: string;
}

export type TModel =
  | Model<AddProof>
  | Model<Verifying>
  | Model<Canonical>
  | Model<MintPoap>
  | undefined;
