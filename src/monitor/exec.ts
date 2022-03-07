import Web3 from "web3";
import { IAbi, IContract } from "./types";
var w3 = new Web3("ws://45.32.73.14:40002/");
const KiltProofsV1Abi = require("./abis/KiltProofsV1.json") as IAbi[];
w3.eth.abi.decodeLog

function main(methods: Web3) {
  const KiltProofsV1: IContract = {
    abi: KiltProofsV1Abi,
    address: "0x72AcB0f573287B3eE0375964D220158cD18465cb",
    contractName: "KiltProofsV1",
  };
  console.log(KiltProofsV1);
}

main(w3);
