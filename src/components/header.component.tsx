import { useMemo } from "react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import logo from "../assets/images/logo.png";

const HeaderComponent = () => {
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  // const switchNetwork = useCallback(async () => {
  //   try {
  //     await window.ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: "0x61" }],
  //     });

  //     return;
  //   } catch (_) {
  //     await window.ethereum.request({
  //       method: "wallet_addEthereumChain",
  //       params: [
  //         {
  //           chainName: "Binance Smart Chain Testnet",
  //           chainId: "0x61",
  //           nativeCurrency: {
  //             name: "Binance Chain Native Token",
  //             symbol: "tBNB",
  //             decimals: 18,
  //           },
  //           rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  //           blockExplorerUrls: ["https://testnet.bscscan.com"],
  //           iconUrls: [
  //             "https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png",
  //           ],
  //         },
  //       ],
  //     });
  //   }
  // }, []);

  const accountToDisplay = useMemo(() => {
    if (!ensName || !account?.address) {
      return "";
    }

    return `Connect With: ${account.address.slice(
      0,
      4
    )}...${account.address.slice(-4)}`;
  }, [account]);

  const onClickDisconnect = async () => {};

  return (
    <div className="px-4 h-16 border-b border-zinc-800 flex items-center justify-between">
      <img src={logo} />

      <div className="flex items-center gap-3">
        <div className="text-white font-semibold text-sm hidden md:inline-block">
          {accountToDisplay}
        </div>

        <button type="button" className="btn btn-primary">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
