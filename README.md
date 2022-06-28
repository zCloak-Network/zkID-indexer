# zkID-indexer

zkID-indexer retrieves each block from the moonbeam network and obtains data for users to query.

## How to start?

### init

```
yarn install
```

### configuration

The configuration file is config.dev.json or config.prod.json in the `src/configs` directory.

- name: zkID-indexer.
- network: The blockchain network that needs to be scanned, using the rpc method to connect.
- startBlock: Which block to start with
- mysql: MySQL configuration
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
  "mysql": {
    "host": "",
    "port": 3306,
    "database": "",
    "username": "",
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


#### Start in production

```
yarn start
yarn start:delete-prod
```

#### Start in the development environment

```bash
yarn dev
yarn start:delete-dev
```

#### Upgrade Side Effects Script

This version adds the address format of bytes type.（2022.6.13）

| table              | field            |
| ------------------ | ---------------- |
| raw_scan_proof     | data_owner_bytes |
| raw_scan_verifying | data_owner_bytes |
| raw_scan_canonical | data_owner_bytes |
| raw_scan_poap      | who_bytes        |

Update historical data by running the following scripts.

```bash
yarn start:update-address-dev
yarn start:update-address-prod

yarn start:update-block-type-dev
yarn start:update-block-type-prod
```

