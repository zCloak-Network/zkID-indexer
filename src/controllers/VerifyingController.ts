import { getTRepository } from "../database";
import { LessThanOrEqual } from "typeorm";
import { VerifyingEntity } from "../database/entity/Verifying";

export async function deleteVerifyings(blockNumber: number, blockType: string) {
  const verifyingRepository = await getTRepository(VerifyingEntity);
  await verifyingRepository.delete({
    blockNumber: LessThanOrEqual(blockNumber),
    blockType: blockType,
  });
}
