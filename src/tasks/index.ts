import Web3 from "web3";
import { IContract } from "../contract/types";
import { scanBest, scanFinalized } from "./batchTask";

export default async function (w3: Web3, allContractEvents: Array<IContract>, config: any) {
  await scanBest(w3, allContractEvents, config);
  await scanFinalized(w3, allContractEvents, config);
}
