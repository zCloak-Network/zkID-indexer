import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { simpleAggregator } from "./abi";

/**
 * Initialize the Contract class and calculate the hash value of the event that needs to be scanned.
 * @export
 * @return {*}  {Promise<IContract>}
 */
export default async function (): Promise<IContract> {
  const simpleAggregatorContract = new Contract(
    simpleAggregator.abi,
    simpleAggregator.address,
    simpleAggregator.name
  );
  await simpleAggregatorContract.caculateEventsHash();
  return simpleAggregatorContract.getContractEventDatas();
}
