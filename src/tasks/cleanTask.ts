import { getLastBlockPointer, saveBlockPointer } from "../controllers/BlockController";
import { deleteCanonical } from "../controllers/CanonicalController";
import { deletePoaps } from "../controllers/PoapController";
import { deleteProofs } from "../controllers/ProofController";
import { deleteVerifyings } from "../controllers/VerifyingController";
import { initDataSource } from "../database";
import { BLOCKTYPE, initTask, loadConfigFile, sleep } from "../utils/task";
import path from "path";

async function clean() {
  while (true) {
    const lastFinalizedPointer = await getLastBlockPointer(BLOCKTYPE.FINALIZED);
    await deleteProofs(lastFinalizedPointer, BLOCKTYPE.BEST);
    await deleteVerifyings(lastFinalizedPointer, BLOCKTYPE.BEST);
    await deleteCanonical(lastFinalizedPointer, BLOCKTYPE.BEST);
    await deletePoaps(lastFinalizedPointer, BLOCKTYPE.BEST);
    await sleep(12 * 1000);
  }
}

async function main() {
  const config = loadConfigFile(process.argv);
  await initTask(config);
  await clean();
}

main();
