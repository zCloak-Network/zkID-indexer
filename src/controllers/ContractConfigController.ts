import Web3 from "web3";
import { getTRepository } from "../database";
import { ContractConfigEntity } from "../database/entity/ContractConfig";

export async function getVersionId(chainId: number, contractAddress: string): Promise<number | null> {
  const contractConfigRepository = await getTRepository(ContractConfigEntity);
  const configContract = (await contractConfigRepository.findOneBy({
    chainId: chainId,
    contractAddress: contractAddress,
  })) as ContractConfigEntity;

  if (configContract) {
    return configContract.id;
  }

  return null;
}

export async function addNewVersion(w3: Web3, contracts: Array<any>) {
  const chainId = await w3.eth.getChainId();
  for (let i = 0; i < contracts.length; i++) {
    const versionId = await getVersionId(chainId, contracts[i].contractAddress);
    if (!versionId) {
      const contractConfigRepository = await getTRepository(ContractConfigEntity);
      const newVersion = new ContractConfigEntity();
      newVersion.chainId = chainId;
      newVersion.contractAddress = contracts[i].contractAddress;
      await contractConfigRepository.save(newVersion);
    }
  }
}
