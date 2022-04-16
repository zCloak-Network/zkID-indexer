import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { proofstorageContractInfo } from "../config/config.model";

export default async function (): Promise<IContract> {
  const proofstorage = new Contract(
    proofstorageContractInfo.abi,
    proofstorageContractInfo.address,
    proofstorageContractInfo.name
  );

  await proofstorage.caculateEventsHash();
  return proofstorage.getContractEventDatas();
}
