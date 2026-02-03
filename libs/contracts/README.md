# Contracts Lib

This lib contains the contracts for the project.
To continue with the development, you need to have a local node running.
You can use the following command to start a local node:

```shell
npx hardhat node
```

This will start a local node on port 8545.

## Get Started

1. Install dependencies

```shell
cd libs/contracts
npm install
```

2. Add environment variables

```shell
cp .env.example .env
```

3. Edit the `.env` file with your own values.

```shell
HARDHAT_VAR_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<INFURA_API_KEY>
HARDHAT_VAR_PRIVATE_KEY=<WALLET_PRIVATE_KEY>
HARDHAT_VAR_ETHERSCAN_API_KEY=<ETHERSCAN_API_KEY>
```

3. Add the contract

- Add the contract to the contracts source
- Add the contract to the test file
- Add the contract to the ignition

4. Compile the contract

```shell
npx hardhat compile
```

5. Testing the contract

- Add the contract to the test file
- Run the test

```shell
npx hardhat test
```

6. Deploying the contract

```shell
npx hardhat ignition deploy ./ignition/modules/TucuToken.ts --network sepolia
```

This will deploy the contract to the Sepolia network and output the contract address.

7. Verify the contract

```shell
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

This will verify the contract on the Sepolia network.
Tip: Copy the address from etherscan and paste it in the ignition file.
