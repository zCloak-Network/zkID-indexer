import { IAbi, IContract } from "./types";
import Web3 from "web3";
const KiltProofsV1Abi = require("./contracts/abis/KiltProofsV1.json") as IAbi[];
const w3 = new Web3("ws://45.32.73.14:40002/");

// 合约abi加上

class Test<T> {
  private _data: T;

  constructor(data: T) {
    this._data = data;
  }

  get data(): T {
    return this._data;
  }
}

// console.log(Kilt as IAbi[]);
KiltProofsV1Abi.forEach((item) => {
  if (item.name === "AddProof") {
    // item.type === "event" && console.log("000");
    const inputs = item.inputs;
    const type = item.type;
    const name = item.name;
    console.log(item);

    if (item.type === "event") {
      // 改为独立方法
      let paramsType: string = "";
      inputs.forEach((inputItem, index) => {
        index
          ? (paramsType = paramsType + "," + inputItem.type)
          : (paramsType = inputItem.type);
      });
      const eventNameParams: string = `${name}(${paramsType})`;
      console.log(paramsType);
      console.log(eventNameParams);

      // Web3.utils.keccak256(eventNameParams);
    }

    // console.log(item);
  }
});
// const names = new Test("ali");
// console.log(names);
