import { provider } from "web3-core";

const customWeb3Request = async (web3Provider: provider, method, params) => {
  try {
    return await requestPromise(web3Provider, method, params);
  } catch (error) {
    throw new Error(error);
  }
};

const requestPromise = async (web3Provider, method, params) => {
  return new Promise((resolve, reject) => {
    web3Provider.send(
      {
        jsonrpc: "2.0",
        id: 1,
        method,
        params,
      },
      (error, result) => {
        if (error) {
          reject(error.message);
        } else {
          if (result.error) {
            reject(result.error.message);
          }
          resolve(result);
        }
      }
    );
  });
};

export async function getFinalizedBlockNumber(web3Provider): Promise<number> {
  try {
    const finalizedHeadHash = (await customWeb3Request(web3Provider, "chain_getFinalizedHead", [])) as any;
    const finalizedBlockHeader = (await customWeb3Request(web3Provider, "chain_getHeader", [
      finalizedHeadHash.result,
    ])) as any;
    return parseInt(finalizedBlockHeader.result.number, 16);
  } catch (error) {
    throw new Error(`Error in getFinalizedBlockNumber\n ${error}`);
  }
}
