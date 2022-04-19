import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { MintPoap } from "./abi";

/**
 * Initialize the Contract class and calculate the hash value of the event that needs to be scanned.
 * @export
 * @return {*}  {Promise<IContract>}
 */
export default async function (): Promise<IContract> {
  const MintPoapContract = new Contract(
    MintPoap.abi,
    MintPoap.address,
    MintPoap.name
  );

  await MintPoapContract.caculateEventsHash();
  return MintPoapContract.getContractEventDatas();
}
