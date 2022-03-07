import BN from "bn.js";
import Web3 from "web3";
import { ILogs, ITransactionReceipt, IInputItem } from "../types";

class TransactionReceipt implements ITransactionReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  cumulativeGasUsed: BN;
  from: string;
  gasUsed: BN;
  logs: ILogs;
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: BN;

  constructor(
    blockHash: string,
    blockNumber: string,
    contractAddress: string | null,
    cumulativeGasUsed: BN,
    from: string,
    gasUsed: BN,
    logs: ILogs,
    logsBloom: string,
    status: string,
    to: string,
    transactionHash: string,
    transactionIndex: BN
  ) {
    this.blockHash = blockHash;
    this.blockNumber = blockNumber;
    this.contractAddress = contractAddress;
    this.cumulativeGasUsed = cumulativeGasUsed;
    this.from = from;
    this.gasUsed = gasUsed;
    this.logs = logs;
    this.logsBloom = logsBloom;
    this.status = status;
    this.to = to;
    this.transactionHash = transactionHash;
    this.transactionIndex = transactionIndex;
  }

}

export default TransactionReceipt;
