import Contract from "./Contract";
import { IAbi, IContract } from "../types";
import { KiltProofsV1ContractInfo } from "./abis/Contract.config";

export default async function (): Promise<Map<string, IContract>> {
  const contractMaps = new Map<string, IContract>();

  const KiltProofsV1 = new Contract(
    KiltProofsV1ContractInfo.abi,
    KiltProofsV1ContractInfo.address,
    KiltProofsV1ContractInfo.name
  );

  await KiltProofsV1.caculateEventsHash();
  const KiltProofsV1Contract: IContract = KiltProofsV1.getContractEventDatas();
  contractMaps.set(KiltProofsV1Contract.address, KiltProofsV1Contract);

  return contractMaps;
}
