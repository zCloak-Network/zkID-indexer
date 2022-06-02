import { getRepository, Repository } from "typeorm";
import { CanonicalEntity } from "../database/entity/Canonical";
import { PoapEntity } from "../database/entity/Poap";
import { ProofEntity } from "../database/entity/Proof";
import { VerifyingEntity } from "../database/entity/Verifying";

export interface IProcessor<T> {
  isAdapt(eventType: string): boolean;
  isSave(receiptLogData: T, versionId: number, blockType: string): Promise<boolean>;
  save(receiptLogData: T, versionChainId: number, blockType: string): Promise<void>;
}

export interface IProofProcessor extends IProcessor<ProofEntity> {
  save(receiptLogData: ProofEntity, versionChainId: number, blockType: string): Promise<void>;
  isSave(receiptLogData: ProofEntity, versionId: number, blockType: string): Promise<boolean>;
}

export interface IVerifyingProcessor extends IProcessor<VerifyingEntity> {
  save(receiptLogData: VerifyingEntity, versionChainId: number, blockType: string): Promise<void>;
  isSave(receiptLogData: VerifyingEntity, versionId: number, blockType: string): Promise<boolean>;
}

export interface ICanonicalProcessor extends IProcessor<CanonicalEntity> {
  save(receiptLogData: CanonicalEntity, versionChainId: number, blockType: string): Promise<void>;
  isSave(receiptLogData: CanonicalEntity, versionId: number, blockType: string): Promise<boolean>;
}

export interface IMintPoapProcessor extends IProcessor<PoapEntity> {
  save: (receiptLogData: PoapEntity, versionChainId: number, blockType: string) => Promise<void>;
  isSave(receiptLogData: PoapEntity, versionId: number, blockType: string): Promise<boolean>;
}
