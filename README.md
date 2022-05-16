# zkID-indexer

zkID-indexer retrieves each block from the moonbeam network and obtains data for users to query.

## How to start?

### init

```
yarn install
```

### configuration

The configuration file is config.json in the root directory.

- name: zkID-indexer.
- network: The blockchain network that needs to be scanned, using the rpc method to connect.
- startBlock: Which block to start with
- mongodb: Mongodb configuration
- contracts: Contract information that needs to be monitored
  - contractName
  - contractAddress
  - abiFile: Contract abi file, please use the format of /abi/ContractName.json, the abi file is placed in the contract/abi folder
- monitorEvents: Which contracts to monitor for events
- bot_url: webhook alarm robot

```json
{
  "name": "",
  "network": "", 
  "startBlock": 0,
  "mongodb": {
    "url": "",
    "user": "",
    "password": ""
  },
  "contracts": [
    {
      "contractName": "",
      "contractAddress": "",
      "abiFile": ""
    }
  ],
  "monitorEvents": ["", ""],
  "bot_url": ""
}

```

### start zkID-indexer

```
yarn start
```
