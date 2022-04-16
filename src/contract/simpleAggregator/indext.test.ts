import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { simpleAggregatorLocal } from "./abi.test";

export default async function (): Promise<IContract> {
  const simpleAggregatorContract = new Contract(
    simpleAggregatorLocal.abi,
    simpleAggregatorLocal.address,
    simpleAggregatorLocal.name
  );
  await simpleAggregatorContract.caculateEventsHash();
  return simpleAggregatorContract.getContractEventDatas();
}
