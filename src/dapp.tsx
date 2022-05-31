import "./index.css";

import { WagmiConfig, createClient } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import HomePage from "./pages/home.page";
import HeaderComponent from "./components/header.component";
import Footer from "./components/footer.component";

/*
// Testnet
// Network Name: Smart Chain - Testnet
// New RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
// ChainID: 97
// Symbol: BNB
// Block Explorer URL: https://testnet.bscscan.com
*/

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: [
        {
          id: 97,
          name: "Binance Smart Chain - Testnet",
          network: "Binance Smart Chain",
          rpcUrls: {
            default: "https://data-seed-prebsc-1-s1.binance.org:8545",
          },
          blockExplorers: {
            default: {
              name: "BSCScan",
              url: "https://testnet.bscscan.com",
            },
          },
          testnet: true,
          nativeCurrency: {
            decimals: 18,
            name: "BNB",
            symbol: "BNB",
          },
        },
      ],
    }),
    new WalletConnectConnector({
      options: {
        qrcode: true,
        rpc: {
          97: "https://data-seed-prebsc-1-s1.binance.org:8545",
        },
      },
    }),
  ],
});

function Dapp() {
  return (
    <WagmiConfig client={client}>
      <main className="min-h-screen bg-brand-black2 flex flex-col relative">
        <HeaderComponent />
        <HomePage />
        <Footer />
      </main>
    </WagmiConfig>
  );
}

export default Dapp;
