import Koa from "koa";
import cors from "@koa/cors";
import router from "./router";

const app = new Koa();
import serve from "koa-static";
import path from "path";
import bodyParser from "koa-bodyparser";
// server configuration
const port = 3000;
const host = "0.0.0.0";

// cors
app.use(cors());
app.use(bodyParser());

// image configuration
// console.log(__dirname);

const asset = serve(path.join(__dirname) + "/public/");
app.use(asset);

// router configuration
app.use(router());

app.listen(port, host, () => {
  console.log(`API server listening on ${host}:${port}`);
});
