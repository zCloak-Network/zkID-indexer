import combineRouters from "koa-combine-routers";
import ProofRouter from "./proof";
import ProgramRouter from "./program";
import TokenRouter from "./token";
import TransferRouter from "./transfer";

const router = combineRouters(
  ProofRouter,
  ProgramRouter,
  TokenRouter,
  TransferRouter
);

export default router;
