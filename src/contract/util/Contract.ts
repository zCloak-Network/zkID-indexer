import Web3 from "web3";
import { IAbi, IContract, IContractEvent } from "../types";
import { EventFilter, EventAndModel } from "../config/config.model";

/**
 * This class is used to generate the related event information of the Contract
 *
 * @class Contract
 */
class Contract {
  // abi of a Contract
  private abi: IAbi[];
  // address of a Contract
  private address: string;
  // contractName of a Contract
  private contractName: string;
  // The property contractEvents is a map, the key is the hash of the event calculated by the keccak256 hash algorithm, and the value is the related property of the event that needs to perform other operations
  private contractEvents: Map<string, IContractEvent> | undefined;

  constructor(abi: IAbi[], address: string, contractName: string) {
    // TODO define Error
    // if(!abi.length) throw
    this.abi = abi;
    this.address = address.toLowerCase();
    this.contractName = contractName;
  }

  /**
   * The caculateEventsHash method is to calculate information about a single event, including hash and other attributes
   *
   * @memberof Contract
   */
  async caculateEventsHash() {
    const eventItemMap = new Map<string, IContractEvent>();

    for (let i = 0; i < this.abi.length; i++) {
      // An event or function in the Contract
      const abiItem = this.abi[i];

      // filter of event, eventFilter is an array of specific events
      if (
        abiItem.type === "event" &&
        EventFilter.indexOf(abiItem.name) !== -1
      ) {
        const eventName = this.getEventName(abiItem);
        const eventHashKey = await Web3.utils
          .keccak256(eventName)
          .toLowerCase();
        // console.log(eventName);

        // console.log(eventHashKey);

        const contractEvent: IContractEvent = {
          eventHash: eventHashKey,
          eventInputs: abiItem.inputs,
          eventName: abiItem.name,
          eventModel: EventAndModel().get(abiItem.name),
        };
        // console.log(`${contractEvent.eventName}----${contractEvent.eventHash}`);

        eventItemMap.set(eventHashKey, contractEvent);
      }
    }
    this.contractEvents = eventItemMap;
  }

  private getEventName(item: IAbi): string {
    // type must be "event"
    // TODO add error deal in top level

    if (item.type !== "event")
      throw new TypeError("This item is not a contract event!");
    if (!item.inputs.length)
      throw new Error("inputs array length in this item is 0!");

    const inputs = item.inputs;
    const name = item.name;

    let paramsType: string = "";

    inputs.forEach((inputItem, index) => {
      index
        ? (paramsType = paramsType + "," + inputItem.type)
        : (paramsType = inputItem.type);
    });
    return `${name}(${paramsType})`;
  }

  /**
   * Returns the calculated data
   * @return {*}  {IContract}
   * @memberof Contract
   */
  getContractEventDatas(): IContract {
    const contractDatas: IContract = {
      contractEvents: this.contractEvents,
      contractName: this.contractName,
      address: this.address,
    };
    return contractDatas;
  }
}

export default Contract;
