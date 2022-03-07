import TransactionReceipt from "./TransactionReceipt";
import BN from "bn.js";

class Blocks {
  private author: string;
  private difficulty: string;
  private extraData: string;
  private gasLimit: BN;
  private gasUsed: BN;
  private hash: string;
  private logsBloom: string;
  private miner: string;
  private number: BN;
  private parentHash: string;
  private receiptsRoot: string;
  private sealFields: string[];
  private sha3Uncles: string;
  private size: BN;
  private stateRoot: string;
  private timestamp: BN;
  private totalDifficulty: string;
  private transactions: string[];
  private transactionsRoot: string;
  private uncles: string[];

  private transactionReceipt?: TransactionReceipt[] | undefined;

  constructor(
    author: string,
    difficulty: string,
    extraData: string,
    gasLimit: BN,
    gasUsed: BN,
    hash: string,
    logsBloom: string,
    miner: string,
    number: BN,
    parentHash: string,
    receiptsRoot: string,
    sealFields: string[],
    sha3Uncles: string,
    size: BN,
    stateRoot: string,
    timestamp: BN,
    totalDifficulty: string,
    transactions: string[],
    transactionsRoot: string,
    uncles: string[]
  ) {
    this.author = author;
    this.difficulty = difficulty;
    this.extraData = extraData;
    this.gasLimit = gasLimit;
    this.gasUsed = gasUsed;
    this.hash = hash;
    this.logsBloom = logsBloom;
    this.miner = miner;
    this.number = number;
    this.parentHash = parentHash;
    this.receiptsRoot = receiptsRoot;
    this.sealFields = sealFields;
    this.sha3Uncles = sha3Uncles;
    this.size = size;
    this.stateRoot = stateRoot;
    this.timestamp = timestamp;
    this.totalDifficulty = totalDifficulty;
    this.transactions = transactions;
    this.transactionsRoot = transactionsRoot;
    this.uncles = uncles;
  }
}

export default Blocks;
