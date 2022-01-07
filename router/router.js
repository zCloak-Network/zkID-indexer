const Router = require("koa-router");
const proofsController = require("../controller/proofs");
const tokenController = require("../controller/token");
const programController = require("../controller/program");
const transferController = require("../controller/transfer");
const message = require("./message");

const router = new Router();

router.post("/proofs", async (ctx) => {
  const { dataOwner, programHash } = ctx.request.body;
  try {
    const proofs = await proofsController.getOneProof(
      (dataOwner + "").toLowerCase(),
      programHash
    );
    ctx.body = message(200, "proofs", proofs);
  } catch (error) {
    // TODO add log4j
    console.log(error);

    ctx.body = message(500, "Database error");
  }
});

router.get("/proofs/one", async (ctx) => {
  const { dataOwner, programHash } = ctx.query;
  try {
    const proof = await proofsController.ifHaveProofs(
      (dataOwner + "").toLowerCase(),
      (programHash + "").toLowerCase()
    );
    console.log(proof);
    ctx.body = message(200, "proof", proof);
  } catch (error) {
    // TODO add log4j
    console.log(error);
    ctx.body = message(200, "Database error");
  }
});

token;

router.get("/programs", async (ctx) => {
  try {
    const programs = await programController.getAllPrograms();
    ctx.body = message(200, "programs", programs);
  } catch (error) {
    // TODO add log4j
    console.log(error);

    ctx.body = message(200, "Database error");
  }
});

router.get("/transfer/record", async (ctx) => {
  const { dataOwner } = ctx.query;
  try {
    const transferRecord = await transferController.getUserTransferRecord(
      (dataOwner + "").toLowerCase()
    );
    ctx.body = message(200, "transfer record", transferRecord);
  } catch (error) {
    // TODO add log4j
    console.log(error);
    ctx.body = message(200, "Database error");
  }
});

router.post("/proofs/percent", async (ctx) => {
  const { dataOwner, rootHash } = ctx.request.body;
  try {
    const transferRecord = await proofsController.getUserTransferPercent(
      (dataOwner + "").toLowerCase(),
      (rootHash + "").toLowerCase()
    );
    ctx.body = message(200, "Percent", transferRecord);
  } catch (error) {
    // TODO add log4j
    console.log(error);
    ctx.body = message(200, "Database error");
  }
});

module.exports = router;
