import { getTRepository } from "../database";
import { ProofEntity } from "../database/entity/Proof";
import { LessThanOrEqual } from "typeorm";

export async function deleteProofs(blockNumber: number, blockType: string) {
  const proofRepository = await getTRepository(ProofEntity);
  await proofRepository.delete({
    blockNumber: LessThanOrEqual(blockNumber),
    blockType: blockType,
  });
}
