import { IContract } from "./types";
import ProofContract from "./proofstorage";
import SimpleAggregator from "./simpleAggregator";
import MintPoap from "./MintPoap";

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
