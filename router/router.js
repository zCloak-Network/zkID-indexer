const Router = require("koa-router");
const proofsController = require("../controller/proofs");
const tokenController = require("../controller/token");
const programController = require("../controller/program");
const transferController = require("../controller/transfer");
const message = require("./message");

const router = new Router();

router.post("/proofs", async (ctx) => {
  const { dataOwner, proofCid } = ctx.request.body;
  try {
    const proofs = await proofsController.getOneProof(dataOwner, proofCid);
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
    const proof = await proofsController.ifHaveProofs(dataOwner, programHash);
    console.log(proof);
    ctx.body = message(200, "proof", proof);
  } catch (error) {
    // TODO add log4j
    console.log(error);

    ctx.body = message(200, "Database error");
  }
});

router.get("/tokens", async (ctx) => {
  try {
    const tokens = await tokenController.getAllTokens();
    ctx.body = message(200, "tokens", tokens);
  } catch (error) {
    // TODO add log4j
    console.log(error);

    ctx.body = message(200, "Database error");
  }
});

router.get("/tokens/rules", async (ctx) => {
  const { tokenAddress } = ctx.query;
  try {
    const tokenRules = await tokenController.getTokenRule(tokenAddress);
    ctx.body = message(200, "token rules", tokenRules);
  } catch (error) {
    // TODO add log4j
    console.log(error);
    ctx.body = message(200, "Database error");
  }
});

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
      dataOwner
    );
    ctx.body = message(200, "transfer record", transferRecord);
  } catch (error) {
    // TODO add log4j
    console.log(error);
    ctx.body = message(200, "Database error");
  }
});

module.exports = router;
