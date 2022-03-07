import Router from "koa-router";
import TransferController from "../controller/TransferController";
import message from "./message";

const TransferRouter = new Router({
  prefix: "/transfer",
});
TransferRouter.get("/record", async (ctx) => {
  const { dataOwner } = ctx.query;
  try {
    const transferRecord = await TransferController.getUserTransferRecord(
      (dataOwner + "").toLowerCase()
    );
    ctx.body = message(200, "transfer record", transferRecord);
  } catch (error) {
    // TODO add log4j
    console.log(error);
    ctx.body = message(200, "Database error");
  }
});

export default TransferRouter;
