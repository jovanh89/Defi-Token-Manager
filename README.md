# DeFi Token Manager

## What is this?

This is a simple challenge app that allows you to manage your DeFi tokens.

## Challenge

Create a basic repo in React where you are going to code a couple of exercises with basic logic in a clean and simple manner.
The idea is to use redux state management or useContext and viem/wagmi library to communicate with the blockchain.

## Install & run (PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Start the development server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser. The app will hot-reload on changes.

## **Keypoints:**

- Understand how the blockchain and contracts work.
- What are viem/wagmi and how to integrate them into a repo.
- Connect a wallet to your app.
- Detect the wrong network and allow the user to switch chains.
- Fetch allowances and balances: show them and manipulate them.
  - Humanize the data.
  - Perform calculations.
  - Inputs and buttons with check validations and UI/UX states (loadings, invalid, errors, etc).
- Write methods on the blockchain.
  - Transfer tokens.
  - Increase and decrease allowance.

## Technologies you should use:

- Nextjs or Vite.
- Router/dom.
- useConext or Redux (Actions/Thunks, Reducer, Selectors).
- Viem / Wagmi.
- Rainbowkit/Rabbykit/Blocknative/Web3modal.
- Prettier/Linter.
- TypeScript.

## Tools:

- How to use etherscan: Etherscan is really usefull to develop since you can see the actual contract and check the read/write methods that this contracts has, also use them (read methods are free to use, write of course you will need to pay for the tx).

# Frontend Exercise

Create a repository with a React app that:

- Allows you connect your wallet.
- Detect the wrong network and allows you to switch between chains (Sepolia).
- Fetch balances of DAI and USDC tokens.
- Displays both balances in a readable/human way.
- Has an input for wallet address to set selected/target user.
- Has an input for each token to enter the amount of tokens to be approved or transfered.
- Has 2 buttons for each token: APPROVE and TRANSFER.
- The inputs have the correct validations hooked to the buttons and also an error message to show to the user ('not enough funds', 'need to approve token first', etc). All of this is calculated/validated with the amount the user types.
- Allows the user to TRANSFER the token to the selected address
- Allows the user to APPROVE the token to the selected address
- Some UNIT tests.
- Allows you to call the Mint() function to get some tokens to test the app.

## Bonuses:

- Organized folder/files structure.
- Well defined state architecture.
- Buttons with loading state.
- Detect that you are in the correct network.
- Some E2E tests.
- UI/UX.
  - Design: custom or using a lib (material, etc).
  - Animations.
  - Responsive.

NOTE: you can add anything you want to the UI.

# Sepolia:

- Get Testnet ETH: https://www.alchemy.com/faucets/ethereum-sepolia
- Sepolia ERC20 contracts:
  - 18 decimals: 0x1D70D57ccD2798323232B2dD027B3aBcA5C00091 [DAI]
  - 6 decimals: 0xC891481A0AaC630F4D89744ccD2C7D2C4215FD47 [USDC]

# Dev Comments

### Added

- **Token Transfer:** Implemented the new token transfer functionality, allowing users to securely send tokens to other addresses.
- **Token Approval:** Added the token approval feature, which allows users to authorize other contracts to spend their tokens on their behalf.
- **Token Minting:** New functionality for creating new tokens, enabling token issuance by the contract owner.
- **Blockchain Library Update:** The main Blockchain library was updated to improve performance, security, and compatibility with the latest versions.
- **UI Library Update:** The user interface (UI) library was updated to optimize user experience, add new features, and improve accessibility.
- **Real-time Notifications:** Real-time notifications were implemented to keep users informed of important events, such as transfers, approvals, and token minting.
- **Protected Routing:** A protected routing system was implemented to ensure that only authenticated users can access certain routes or features of the application.
- **Microfrontend-ready Structure:** The application's structure has been adapted to facilitate the implementation of a microfrontend architecture in the future, allowing for more modular and scalable development.
- **Responsive Design:** Implemented a responsive design to ensure an optimal user experience across a wide range of devices, from desktops to mobile phones and tablets.

### Fixed

- **Minor Navigation Bug Fixes:** Minor bugs affecting the application's navigation were fixed, improving fluidity and usability.
- **Mobile Loading Issue Resolved:** A problem causing loading errors on mobile devices was resolved, optimizing the experience on these devices.
- **User Experience Improvements:** Various improvements were made to the user experience, including optimizations to the interface, navigation, and overall application performance.
