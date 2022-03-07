import Web3 from "web3";
import BN from "bn.js";
import { TransactionReceipt, BlockNumber } from "web3-core";
import ContractEvents from "./ContractEvents";
import { IContract } from "./types";

async function queryOneBlockTransaction(
  w3: Web3,
  blockNumber: number,
  allContractEvents: Map<string, IContract>
) {
  const oneBlock = await w3.eth.getBlock(blockNumber);
  const transactions = oneBlock.transactions;

  for (let i = 0; i < transactions.length; i++) {
    const trs = await w3.eth.getTransactionReceipt(transactions[i]);
    await decodeLogs(w3, trs, allContractEvents);
  }
}

async function decodeLogs(
  w3: Web3,
  data: TransactionReceipt,
  allContractEvents: Map<string, IContract>
) {
  if (allContractEvents.get(data.to)) {
    const inputs = allContractEvents
      .get(data.to)
      ?.contractEvents?.get(data.logs[0].topics[0])?.eventInputs;

    if (inputs) {
      const decodeData = w3.eth.abi.decodeLog(
        inputs,
        data.logs[0].data,
        data.logs[0].topics
      ) as unknown as any;
      decodeData.blockNumber = data.blockNumber;
      const mm = allContractEvents
        .get(data.to)
        ?.contractEvents?.get(data.logs[0].topics[0])?.eventModel;
      console.log(mm);

      if (mm) {
        // console.log(decodeData);
        // console.log(typeof mm.prototype);

        decodeData.cType && (decodeData.cTypeHash = decodeData.cType);
        const cc = new mm(decodeData);
        // let ccd: TModel;

        // console.log(cc);
        await cc.save().then((res) => {
          console.log(res);
        });
      }
    }
  }
  // }
}

async function scan() {
  const allContractEvents = await ContractEvents();

  const w3 = new Web3("ws://45.32.73.14:40002");

  const last = 1340000;
  const blockNumberNow = await w3.eth.getBlockNumber();

  // for (let i = last; i < blockNumberNow; i++) {
  //   queryOneBlockTransaction(i);
  // }
  const data = await queryOneBlockTransaction(w3, 1388966, allContractEvents);
}
scan();
