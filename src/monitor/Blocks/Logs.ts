import { IInputItem, ILogs } from "../types";
import BN from "bn.js";
import Web3 from "web3";

class Logs {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: BN;
  removed: Boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: BN;
  transactionLogIndex: string;
  id: string;

  constructor(
    address: string,
    blockHash: string,
    blockNumber: string,
    data: string,
    logIndex: import("bn.js"),
    removed: Boolean,
    topics: string[],
    transactionHash: string,
    transactionIndex: import("bn.js"),
    transactionLogIndex: string,
    id: string
  ) {
    this.address = address;
    this.blockHash = blockHash;
    this.blockNumber = blockNumber;
    this.data = data;
    this.logIndex = logIndex;
    this.removed = removed;
    this.topics = topics;
    this.transactionHash = transactionHash;
    this.transactionIndex = transactionIndex;
    this.transactionLogIndex = transactionLogIndex;
    this.id = id;
  }

  async decodeLogs(
    w3: Web3,
    inputs: IInputItem[]
  ): Promise<Map<string, string | BN | Boolean>> {
    const eventData = new Map<string, string | BN | Boolean>();
    // w3.eth.getTransactionReceipt()
    const logsData: any = await w3.eth.abi.decodeLog(
      inputs,
      this.data,
      this.topics
    );
    for (const key in logsData) {
      if (Object.prototype.hasOwnProperty.call(logsData, key)) {
        const element = logsData[key];
        console.log(element);
      }
    }
    return eventData;
  }
}

export default Logs;
