import client from "prom-client";
import http from "http";
import url from "url";
import { BLOCKTYPE } from "./task";

const PROM_PORT = 9901;
const register = new client.Registry();

register.setDefaultLabels({
  app: "zCloak-indexer",
});

const gauge = new client.Gauge({
  name: "block_height",
  help: "metric_help",
});

register.registerMetric(gauge);
client.collectDefaultMetrics({ register });

const server = http.createServer(async (req, res) => {
  const route = url.parse(req.url).pathname;
  if (route === "/metrics") {
    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());
  }
});

server.listen(PROM_PORT);

export function gaugeInc(blockType: string, incNum: number) {
  if (blockType === BLOCKTYPE.BEST) {
    gauge.inc(incNum);
  }
}

export function gaugeSet(blockType: string, blockHeight: number) {
  if (blockType === BLOCKTYPE.BEST) {
    gauge.set(blockHeight);
  }
}
