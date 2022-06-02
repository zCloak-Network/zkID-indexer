import { getLastBlockPointer, saveBlockPointer } from "../controllers/BlockController";
import { deleteCanonical } from "../controllers/CanonicalController";
import { deletePoaps } from "../controllers/PoapController";
import { deleteProofs } from "../controllers/ProofController";
import { deleteVerifyings } from "../controllers/VerifyingController";
import { BLOCKTYPE, initTask, loadConfigFile, sleep } from "../utils/task";
import * as log4js from "../utils/log4js";

async function clean() {
  while (true) {
    const lastFinalizedPointer = await getLastBlockPointer(BLOCKTYPE.FINALIZED);
    await deleteProofs(lastFinalizedPointer, BLOCKTYPE.BEST);
    await deleteVerifyings(lastFinalizedPointer, BLOCKTYPE.BEST);
    await deleteCanonical(lastFinalizedPointer, BLOCKTYPE.BEST);
    await deletePoaps(lastFinalizedPointer, BLOCKTYPE.BEST);
    log4js.info(`Deleted data before ${lastFinalizedPointer} and timestamp is ${new Date().getTime()}.`);
    await sleep(12 * 1000);
  }
}

async function main() {
  const config = loadConfigFile(process.argv);
  await initTask(config);
  await clean();
}

main();
