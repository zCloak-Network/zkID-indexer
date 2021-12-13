const EventData = [
  {
    event:
      "AddProof(address,bytes32,bytes32,bytes32,string,string,bytes32,bool)",
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dataOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "kiltAddress",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "cType",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "programHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fieldName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "proofCid",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "rootHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "expectResult",
        type: "bool",
      },
    ],
    eventModel: "proofs",
  },
  // event RTransfer(address token, address from, address to, uint256 amount, bytes32 programHash);
  {
    event: "RTransfer(address,address,address,uint256,bytes32)",
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "programHash",
        type: "bytes32",
      },
    ],
    eventModel: "transfers",
  },
  // event AddRule(address token, address checker, bytes32 cType, bytes32 programHash, bool expectedResult);
  {
    event: "AddRule(address,address,bytes32,bytes32,bool)",
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "checker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "cType",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "programHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "expectedResult",
        type: "bool",
      },
    ],
    eventModel: "token_program_rules",
  },
  // event AddVerification(address dataOwner, address worker, bytes32 rootHash, bool isPassed);
  {
    event: "AddVerification(address,address,bytes32,bool)",
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dataOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "worker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "rootHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPassed",
        type: "bool",
      },
    ],
    eventModel: "worker_result_process",
  },
  // event VerificationDone(address dataOwner, bytes32 cType, bytes32 programHash, bool isPassed);
  {
    event: "VerificationDone(address,bytes32,bytes32,bool)",
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dataOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "cType",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "programHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPassed",
        type: "bool",
      },
    ],
    eventModel: "worker_result_done",
  },
];

module.exports = EventData;
