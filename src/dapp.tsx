import "./index.css";

import { Web3ReactProvider } from "@web3-react/core";
import {
  Web3Provider,
  ExternalProvider,
  JsonRpcFetchFunc,
} from "@ethersproject/providers";

import HomePage from "./pages/home.page";
import HeaderComponent from "./components/header.component";

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

function Dapp() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <main className="min-h-screen bg-brand-black2 flex flex-col relative">
        <HeaderComponent />
        <HomePage />
      </main>
    </Web3ReactProvider>
  );
}

export default Dapp;
