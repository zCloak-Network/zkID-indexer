import Web3 from "web3";
import { Log } from "web3-core";
import { getTopicAbi, getTopicName } from "../contract/util";
import { IContract } from "../contract/types";
import { AddProof, Canonical, MintPoap, Verifying } from "../database/types";
import { AbiInput } from "web3-utils";
import { saveAddProof, saveCanonical, saveMintPoap, saveVerifying } from "../database/util";

export async function decodeAllData(w3: Web3, logsArray: Log[], allContractEvents: Array<IContract>) {
  logsArray.forEach((item) => {
    const topicInput = getTopicAbi(allContractEvents, item.topics[0]);
    const topicName = getTopicName(allContractEvents, item.topics[0]);
    topicInput && topicName && decodeOneAndSave(w3, topicInput, topicName, item);
  });
}

async function decodeOneAndSave(w3: Web3, topicInput: AbiInput[], topicName: string, item: Log) {
  const blockInfo = await w3.eth.getBlock(item.blockNumber);
  const decodeData = await w3.eth.abi.decodeLog(topicInput, item.data, item.topics);

  switch (topicName) {
    case "AddProof":
      await saveAddProof(
        decodeData as unknown as AddProof,
        item.blockNumber,
        item.transactionHash,
        item.blockHash,
        blockInfo.timestamp as number
      );
      break;
    case "Verifying":
      await saveVerifying(
        decodeData as unknown as Verifying,
        item.blockNumber,
        item.transactionHash,
        item.blockHash,
        blockInfo.timestamp as number
      );
      break;
    case "Canonical":
      await saveCanonical(
        decodeData as unknown as Canonical,
        item.blockNumber,
        item.transactionHash,
        item.blockHash,
        blockInfo.timestamp as number
      );
      break;
    case "MintPoap":
      await saveMintPoap(
        decodeData as unknown as MintPoap,
        item.blockNumber,
        item.transactionHash,
        item.blockHash,
        blockInfo.timestamp as number
      );
      break;
  }
}
