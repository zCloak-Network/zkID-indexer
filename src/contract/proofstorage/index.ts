import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { proofstorage } from "./abi";

/**
 * Initialize the Contract class and calculate the hash value of the event that needs to be scanned.
 * @export
 * @return {*}  {Promise<IContract>}
 */
export default async function (): Promise<IContract> {
  const proofstorageContract = new Contract(
    proofstorage.abi,
    proofstorage.address,
    proofstorage.name
  );

  await proofstorageContract.caculateEventsHash();
  return proofstorageContract.getContractEventDatas();
}
