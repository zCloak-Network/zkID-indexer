import { AddProof, Canonical, MintPoap, Verifying } from "../types";

export interface IProcessor<T> {
  isAdapt(eventType: string): boolean;
  isSave(receiptLogData: T): Promise<boolean>;
  save(receiptLogData: T, versionChainId: number, versionContract): Promise<void>;
}

export interface IProofProcessor extends IProcessor<AddProof> {
  save(receiptLogData: AddProof, versionChainId: number, versionContract): Promise<void>;
  isSave(receiptLogData: AddProof): Promise<boolean>;
}

export interface IVerifyingProcessor extends IProcessor<Verifying> {
  save(receiptLogData: Verifying, versionChainId: number, versionContract): Promise<void>;
  isSave(receiptLogData: Verifying): Promise<boolean>;
}

export interface ICanonicalProcessor extends IProcessor<Canonical> {
  save(receiptLogData: Canonical, versionChainId: number, versionContract): Promise<void>;
  isSave(receiptLogData: Verifying): Promise<boolean>;
}

export interface IMintPoapProcessor extends IProcessor<MintPoap> {
  save: (receiptLogData: MintPoap, versionChainId: number, versionContract) => Promise<void>;
  isSave(receiptLogData: MintPoap): Promise<boolean>;
}
