import { getTRepository } from "../database";
import { LessThanOrEqual } from "typeorm";
import { PoapEntity } from "../database/entity/Poap";

export async function deletePoaps(blockNumber: number, blockType: string) {
  const poapRepository = await getTRepository(PoapEntity);
  await poapRepository.delete({
    blockNumber: LessThanOrEqual(blockNumber),
    blockType: blockType,
  });
}
