import BN from "bn.js";
import { Model } from "mongoose";
import { AbiInput, AbiItem } from "web3-utils";
import { TModel } from "../database/types";

export interface IContractInfo {
  abi: IAbi[];
  name: string;
  address: string;
}

/**
 * abi input list item
 * @export
 * @interface IInputItem
 */
export interface IInputItem extends AbiInput {}

/**
 * abi interface, include
 * @export
 * @interface IAbi
 */
export interface IAbi {
  inputs: Array<AbiInput>;
  name: string;
  type: string;
  anonymous: Boolean;
}

/**
 * contract interface, include abi, address and contract name
 * @export
 * @interface IContract
 */
export interface IContract {
  abi?: IAbi[];
  address: string;
  contractName: string;
  contractEvents?: Map<string, IContractEvent>;
}

/**
 * contract event data structure
 * @export
 * @interface IContractEvent
 */
export interface IContractEvent {
  eventHash: string;
  eventName: string;
  eventInputs: AbiInput[];
}

export interface IModelAndInput {
  input: AbiInput[];
  model: TModel;
}
