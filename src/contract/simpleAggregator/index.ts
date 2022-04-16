import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import {
  proofstorageContractInfo,
  simpleAggregatorContractInfo,
} from "../config/config.model";

export default async function (): Promise<IContract> {
  const simpleAggregator = new Contract(
    simpleAggregatorContractInfo.abi,
    simpleAggregatorContractInfo.address,
    simpleAggregatorContractInfo.name
  );
  await simpleAggregator.caculateEventsHash();
  return simpleAggregator.getContractEventDatas();
}
