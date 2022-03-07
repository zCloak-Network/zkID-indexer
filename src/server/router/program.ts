import Router from "koa-router";
import ProgramController from "../controller/ProgramController";
import message from "./message";

const ProgramRouter = new Router({
  prefix: "/programs",
});
ProgramRouter.get("/programs", async (ctx) => {
  try {
    const programs = await ProgramController.getAllPrograms();
    ctx.body = message(200, "programs", programs);
  } catch (error) {
    // TODO add log4j
    console.log(error);

    ctx.body = message(200, "Database error");
  }
});

export default ProgramRouter;
