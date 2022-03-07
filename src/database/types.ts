import { Model } from "mongoose";

export interface BlockRecord {
  blockNumber: number;
  blockHash: string;
  blockType: string;
  blockTime: string;
}

export interface BlockRecordDelete {
  blockNumber: number;
  blockHash: string;
  blockType: string;
  blockTime: string;
}

export interface Proofs {
  blockNumber?: number;
  blockHash?: string;
  blockTime?: string;
  cType?: string;

  dataOwner: string;
  kiltAddress: string;
  cTypeHash: string;
  programHash: string;
  fieldName: string;
  proofCid: string;
  expectResult: boolean;
  rootHash: string;
}

export interface TokenProgramRules {
  blockNumber?: number;
  blockHash?: string;
  blockTime?: string;
  tokenAddress: string;
  checker: string;
  expectedResult: boolean;
  cTypeHash: string;
  programHash: string;
}

export interface Token {
  tokenAddress: string;
  tokenName: string;
  tokenImageUrl: string;
}

export interface Transfer {
  blockNumber?: number;
  blockHash?: string;
  blockTime?: string;

  tokenAddress: string;
  from: string;
  to: string;
  amount: number;
  programHash: string;
}

export interface VerifyRecord {
  blockNumber?: number;
  blockHash?: string;
  blockTime?: string;
  dataOwner: string;
  worker: string;
  rootHash: string;
  isPassed: boolean;
}

export interface Program {
  programHash: string;
  programDetail: string;
  cTypeHash: string;
  programFieldName: string;
  programHashName: string;
}

export interface Ctype {
  cTypeHash: string;
  cTypeAlias: string;
}

export type TModel =
  | Model<Proofs>
  | Model<TokenProgramRules>
  | Model<Transfer>
  | Model<VerifyRecord>
  | undefined;
