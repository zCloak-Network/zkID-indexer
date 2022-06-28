import { getRepository, Repository } from "typeorm";
import { CanonicalEntity } from "../database/entity/Canonical";
import { PoapEntity } from "../database/entity/Poap";
import { ProofEntity } from "../database/entity/Proof";
import { VerifyingEntity } from "../database/entity/Verifying";

export interface IProcessor<T> {
  isAdapt(eventType: string): boolean;
  updateFinalized(transactionHash: string, versionId: number): Promise<void>;
  isExisted(transactionHash: string, versionId: number, blockType: string): Promise<boolean>;
  saveBest(receiptLogData: T, versionId: number, blockType: string): Promise<void>;
}

export interface IProofProcessor extends IProcessor<ProofEntity> {}

export interface IVerifyingProcessor extends IProcessor<VerifyingEntity> {}

export interface ICanonicalProcessor extends IProcessor<CanonicalEntity> {}

export interface IMintPoapProcessor extends IProcessor<PoapEntity> {}
