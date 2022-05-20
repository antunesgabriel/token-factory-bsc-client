import { InjectedConnector } from "@web3-react/injected-connector";

/*
Testnet
Network Name: Smart Chain - Testnet
New RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
ChainID: 97
Symbol: BNB
Block Explorer URL: https://testnet.bscscan.com
*/

export const InjectedWalletConnector = new InjectedConnector({
  supportedChainIds: [97],
});
