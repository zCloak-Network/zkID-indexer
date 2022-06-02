import { getTRepository } from "../database";
import { LessThanOrEqual } from "typeorm";
import { CanonicalEntity } from "../database/entity/Canonical";

export async function deleteCanonical(blockNumber: number, blockType: string) {
  const canonicalRepository = await getTRepository(CanonicalEntity);
  await canonicalRepository.delete({
    blockNumber: LessThanOrEqual(blockNumber),
    blockType: blockType,
  });
}
