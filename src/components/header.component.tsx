import { useWeb3React } from "@web3-react/core";
import { useCallback, useMemo } from "react";

import { InjectedWalletConnector } from "../utils/wallets-connectors.util";

import logo from "../assets/images/logo.png";

const HeaderComponent = () => {
  const { activate, deactivate, active, account } = useWeb3React();

  const switchNetwork = useCallback(async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });

      return;
    } catch (_) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: "Binance Smart Chain Testnet",
            chainId: "0x61",
            nativeCurrency: {
              name: "Binance Chain Native Token",
              symbol: "tBNB",
              decimals: 18,
            },
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
            blockExplorerUrls: ["https://testnet.bscscan.com"],
            iconUrls: [
              "https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png",
            ],
          },
        ],
      });
    }
  }, []);

  const onClickConnect = useCallback(async () => {
    try {
      await switchNetwork();
      activate(InjectedWalletConnector);
    } catch (err) {
      console.warn("error on connect");
    }
  }, [switchNetwork]);

  const accountToDisplay = useMemo(() => {
    if (!account) {
      return "";
    }

    return `Connect With: ${account.slice(0, 4)}...${account.slice(-4)}`;
  }, [account]);

  const onClickDisconnect = () => {
    deactivate();
  };

  return (
    <div className="px-4 h-16 border-b border-zinc-800 flex items-center justify-between">
      <img src={logo} />

      <div className="flex items-center gap-3">
        <div className="text-white font-semibold text-sm hidden md:inline-block">
          {accountToDisplay}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={active ? onClickDisconnect : onClickConnect}
        >
          {active ? "Disconnect" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
