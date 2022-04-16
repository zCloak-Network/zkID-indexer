import Contract from "../util/Contract";
import { IAbi, IContract } from "../types";
import { MintPoap } from "./abi";

export default async function (): Promise<IContract> {
  const MintPoapContract = new Contract(
    MintPoap.abi,
    MintPoap.address,
    MintPoap.name
  );

  await MintPoapContract.caculateEventsHash();
  return MintPoapContract.getContractEventDatas();
}
