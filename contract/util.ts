import { IContract, IModelAndInput } from "./types";
import { AbiInput } from "web3-utils";

export function getTopicAbi(maps: Array<IContract>, topics: string): AbiInput[] | null {
  for (let i = 0; i < maps.length; i++) {
    const contract = maps[i]?.contractEvents?.get(topics);
    if (contract) return contract.eventInputs;
  }
  return null;
}

export function getTopicName(maps: Array<IContract>, topics: string): string | null {
  for (let i = 0; i < maps.length; i++) {
    const contract = maps[i]?.contractEvents?.get(topics);
    if (contract) return contract.eventName;
  }
  return null;
}

export function getVersionContract(maps: Array<IContract>, topics: string): string | null {
  for (let i = 0; i < maps.length; i++) {
    const contract = maps[i]?.contractEvents?.get(topics);
    if (contract) return maps[i].address;
  }
  return null;
}

function configErrorExit(message: string) {
  console.log(message);
  process.exit(1);
}

export function checkConfig(config: any) {
  !config.network.length && configErrorExit("Check your network configuration in config.json!");
  !config.contracts.length && configErrorExit("Check your contracts configuration in config.json!");
  !config.mongodb.url && configErrorExit("Check your mongodb configuration in config.json!");
  !config.startBlock.toString().length && configErrorExit("Check your startBlock configuration in config.json!");
  !config.monitorEvents.length && configErrorExit("Check your monitorEvents configuration in config.json!");
}
