import Router from "koa-router";
import TokenController from "../controller/TokenController";
import message from "./message";

const TokenRouter = new Router({
  prefix: "/tokens",
});
TokenRouter.get("/", async (ctx) => {
  try {
    const tokens = await TokenController.getAllTokens();
    ctx.body = message(200, "tokens", tokens);
  } catch (error) {
    // TODO add log4j
    console.log(error);

    ctx.body = message(200, "Database error");
  }
});

TokenRouter.get("/rules", async (ctx) => {
  const { tokenAddress } = ctx.query;
  try {
    const tokenRules = await TokenController.getTokenRule(
      (tokenAddress + "").toLowerCase()
    );
    ctx.body = message(200, "token rules", tokenRules);
  } catch (error) {
    // TODO add log4j
    console.log(error);
    ctx.body = message(200, "Database error");
  }
});

export default TokenRouter;
