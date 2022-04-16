import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { proofstorageLocal } from "./abi.test";

export default async function (): Promise<IContract> {
  const proofstorageContract = new Contract(
    proofstorageLocal.abi,
    proofstorageLocal.address,
    proofstorageLocal.name
  );

  await proofstorageContract.caculateEventsHash();
  return proofstorageContract.getContractEventDatas();
}
