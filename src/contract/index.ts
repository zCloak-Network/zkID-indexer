import Contract from "./util/Contract";
import { IAbi, IContract } from "./types";
import ProofStorageAbi from "./abis/ProofStorage.json";
import SimpleAggregator from "./abis/SimpleAggregator.json";
import ZCloakPoap from "./abis/ZCloakPoap.json";
import address from "./abis/address.json";

export default async function (): Promise<Map<string, IContract>> {
  const contractMaps = new Map<string, IContract>();
  const ProofStorageContract = new Contract(
    ProofStorageAbi.abi as IAbi[],
    address.ProofStorage,
    ProofStorageAbi.contractName
  );

  const SimpleAggregatorContract = new Contract(
    SimpleAggregator.abi as IAbi[],
    address.SimpleAggregator,
    SimpleAggregator.contractName
  );
  const ZCloakPoapContract = new Contract(ZCloakPoap.abi as IAbi[], address.ZcloakPoap, ZCloakPoap.contractName);
  await ProofStorageContract.caculateEventsHash();
  await SimpleAggregatorContract.caculateEventsHash();
  await ZCloakPoapContract.caculateEventsHash();

  const ProofStorageContractData = ProofStorageContract.getContractEventDatas();
  const SimpleAggregatorContractData = SimpleAggregatorContract.getContractEventDatas();
  const ZCloakPoapContractData = ZCloakPoapContract.getContractEventDatas();

  contractMaps.set(ProofStorageContractData.address, ProofStorageContractData);
  contractMaps.set(SimpleAggregatorContractData.address, SimpleAggregatorContractData);
  contractMaps.set(ZCloakPoapContractData.address, ZCloakPoapContractData);

  return contractMaps;
}
