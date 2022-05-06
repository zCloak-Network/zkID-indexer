import { IContract, IModelAndInput } from "./types";
import ProofContract from "./proofstorage";
import SimpleAggregator from "./simpleAggregator";
import MintPoap from "./MintPoap";
import { TModel } from "../database/types";

export default async function (): Promise<Map<string, IContract>> {
  const contractMaps = new Map<string, IContract>();

  const ProofContractEvent = await ProofContract();
  const SimpleAggregatorEvent = await SimpleAggregator();
  const MintPoapEvent = await MintPoap();

  contractMaps.set(ProofContractEvent.address, ProofContractEvent);
  contractMaps.set(SimpleAggregatorEvent.address, SimpleAggregatorEvent);
  contractMaps.set(MintPoapEvent.address, MintPoapEvent);

  return contractMaps;
}

export const getModels = (maps: Map<string, IContract>, topics: string): IModelAndInput | null => {
  for (const key of maps.keys()) {
    const contract = maps.get(key)?.contractEvents?.get(topics);
    if (contract) {
      console.log(contract.eventName);
      return {
        emodel: contract.eventModel,
        einput: contract.eventInputs,
      };
    }
  }
  return null;
};
