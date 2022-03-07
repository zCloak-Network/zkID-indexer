import BN from "bn.js";
import { Model } from "mongoose";
import { AbiInput, AbiItem } from "web3-utils";
import { Proofs, TModel, VerifyRecord } from "../database/types";

export interface IContractInfo {
  abi: IAbi[]
  name: string;
  address: string;
}

/**
 * abi input list item
 * @export
 * @interface IInputItem
 */
export interface IInputItem extends AbiInput {}

/**
 * abi interface, include
 * @export
 * @interface IAbi
 */
export interface IAbi {
  inputs: Array<IInputItem>;
  name: string;
  type: string;
  anonymous: Boolean;
}

/**
 * contract interface, include abi, address and contract name
 * @export
 * @interface IContract
 */
export interface IContract {
  abi?: IAbi[];
  address: string;
  contractName: string;
  contractEvents?: Map<string, IContractEvent>;
}

/**
 * contract event data structure
 * @export
 * @interface IContractEvent
 */
export interface IContractEvent {
  eventHash: string;
  eventName: string;
  eventInputs: AbiInput[];
  eventModel?: TModel;
}

/**
 * data structure of TransactionReceipt logs
 * @export
 * @interface ILogs
 */
export interface ILogs {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: BN;
  removed: Boolean;
  topics: Array<string>;
  transactionHash: string;
  transactionIndex: BN;
  transactionLogIndex: string;
  id: string;
}

/**
 * data structure of TransactionReceipt
 * @export
 * @interface ITransactionReceipt
 */
export interface ITransactionReceipt {
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
}

/**
 * data struct of blocks
 * @export
 * @interface IBlock
 */
export interface IBlock {
  author: string;
  difficulty: string;
  extraData: string;
  gasLimit: BN;
  gasUsed: BN;
  hash: string;
  logsBloom: string;
  miner: string;
  number: BN;
  parentHash: string;
  receiptsRoot: string;
  sealFields: Array<string>;
  sha3Uncles: string;
  size: BN;
  stateRoot: string;
  timestamp: BN;
  totalDifficulty: string;
  transactions: Array<string>;
  transactionsRoot: string;
  uncles: Array<string>;
}

// {
//   "blockHash": "0x73bf07ec8ecdb8674a568d4e17df1ef0320a28d6cbb718f5f89aa089b62e6eeb",
//   "blockNumber": 1388966,
//   "contractAddress": null,
//   "cumulativeGasUsed": 388822,
//   "from": "0x34ef2480e87a50ebad888653d6b06b1bd7430064",
//   "gasUsed": 156068,
//   "logs": [
//     {
//       "address": "0x72AcB0f573287B3eE0375964D220158cD18465cb",
//       "blockHash": "0x73bf07ec8ecdb8674a568d4e17df1ef0320a28d6cbb718f5f89aa089b62e6eeb",
//       "blockNumber": 1388966,
//       "data": "0x00000000000000000000000034ef2480e87a50ebad888653d6b06b1bd7430064f85edd58bd7de60dac41894c508a1522f86d4b1066e3a4cbea3ab0353e659d577f2ef721b292b9b7d678e9f82ab010e139600558df805bbc61a0041e60b61a188acf8f36dbd0407ced227c97f9f1bcf989c6affd32231ad56a36e9dfcd49261000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140ed263f14fe2477486ebb59aaaec0c4cf1e2455ef6f3bda24c08700139ad59ce0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000036167650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d646b5a65534738787a506758526d375a6973717847315137314866795053717a374c5537524a48767a343953000000000000000000000000000000000000",
//       "logIndex": 2,
//       "removed": false,
//       "topics": [
//         "0x5e933508399323c6d033ea47c60817745c447dbf1ff9dc4588fe99a3ab054a8d"
//       ],
//       "transactionHash": "0xafca8180eb7051f33e2f062bb3b6102cf952072a3772f6f4a12cf8b768949299",
//       "transactionIndex": 8,
//       "transactionLogIndex": "0x0",
//       "id": "log_7ab5a3c4"
//     }
//   ],
//   "logsBloom": "0x00000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000010000000000000000000001000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400",
//   "status": true,
//   "to": "0x72acb0f573287b3ee0375964d220158cd18465cb",
//   "transactionHash": "0xafca8180eb7051f33e2f062bb3b6102cf952072a3772f6f4a12cf8b768949299",
//   "transactionIndex": 8
// }
