import Router from "koa-router";
import ProofController from "../controller/ProofController";
import message from "./message";

const ProofRouter = new Router({
  prefix: "/proofs",
});
ProofRouter.post("/", async (ctx) => {
  const { dataOwner, programHash } = ctx.request.body;
  try {
    const proofs = await ProofController.getOneProof(
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

ProofRouter.get("/one", async (ctx) => {
  const { dataOwner, programHash } = ctx.query;
  try {
    const proof = await ProofController.ifHaveProofs(
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

export default ProofRouter;
