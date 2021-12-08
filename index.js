const Koa = require("koa");
const app = new Koa();
const router = require("./router/router");
const serve = require("koa-static");
const path = require("path");
const cors = require("koa2-cors");
var bodyParser=require("koa-bodyparser");
// server configuration
const port = "8080";
const host = "0.0.0.0";

// cors
app.use(cors());
app.use(bodyParser());

// image configuration
const asset = serve(path.join(__dirname) + "/public/");
app.use(asset);

// router configuration
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, host, () => {
  console.log(`API server listening on ${host}:${port}`);
});
