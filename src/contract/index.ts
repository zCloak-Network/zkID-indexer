import Contract from "./Contract";
import { IAbi, IContract } from "./types";
import * as fs from "fs";
import * as log4js from "../utils/log4js";

export default async function (config: any): Promise<Array<IContract>> {
  const contractMaps = new Array<IContract>();

  for (let i = 0; i < config.contracts.length; i++) {
    const item = config.contracts[i];
    if (fs.existsSync(__dirname + item.abiFile)) {
      let abiJson = JSON.parse(fs.readFileSync(__dirname + item.abiFile, "utf8"));
      const ContractItem = new Contract(abiJson.abi as IAbi[], item.contractAddress, abiJson.contractName);
      await ContractItem.calculateEventsHash(config);
      contractMaps.push(ContractItem.getContractEventDatas());
    } else {
      log4js.error(
        `${__dirname}${item.abiFile} does not exist! Check your contracts abiFile configuration in config.json`
      );
      process.exit(1);
    }
  }
  return contractMaps;
}
