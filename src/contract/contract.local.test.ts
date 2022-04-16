import { IContract } from "./types";
import ProofContract from "./proofstorage/index.test";
import SimpleAggregator from "./simpleAggregator/indext.test";

export default async function (): Promise<Map<string, IContract>> {
  const contractMaps = new Map<string, IContract>();

  const ProofContractEvent = await ProofContract();
  const SimpleAggregatorEvent = await SimpleAggregator();

  contractMaps.set(ProofContractEvent.address, ProofContractEvent);
  contractMaps.set(SimpleAggregatorEvent.address, SimpleAggregatorEvent);

  return contractMaps;
}
