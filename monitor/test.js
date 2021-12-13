const web3 = require("web3");
const BN = require("bn.js");

const EventData = require("./EventData");

function convertEventToHashMap(EventData) {
  const eventMap = new Map();
  EventData.forEach((item) => {
    // console.log(`use ${item.event} to generate hash is:`);
    const key = web3.utils.keccak256(item.event);
    // console.log(key);
    eventMap.set(key, {
      inputs: item.inputs,
      eventModel: item.eventModel,
    });
  });
  return eventMap;
}
console.log(convertEventToHashMap(EventData));
