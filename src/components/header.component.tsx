import { useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

import logo from "../assets/images/logo.png";
import ModalConnectors from "./modal-connectors.component";

const HeaderComponent = () => {
  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();
  const { activeConnector, isConnecting } = useConnect();
  const { activeChain, switchNetwork } = useNetwork();

  const [isOpen, setIsOpen] = useState(false);

  const accountToDisplay = useMemo(() => {
    if (!account?.address) {
      return "";
    }

    return `Connect With: ${account.address.slice(
      0,
      4
    )}...${account.address.slice(-4)} -`;
  }, [account]);

  useEffect(() => {
    if (activeChain?.id !== 97 && switchNetwork) {
      switchNetwork(97);
    }
  }, [activeChain]);

  return (
    <div className="px-4 h-16 border-b border-zinc-800 flex items-center justify-between">
      <ModalConnectors
        isOpen={isOpen}
        onClose={() => {
          setIsOpen((o) => !o);
        }}
        title="Connect your wallet"
        describe="At the moment this dapp only interacts with the BSC (Testnet)"
      />

      <img src={logo} />

      <div className="flex items-center gap-3">
        <div className="text-white font-semibold text-sm hidden md:inline-block">
          {accountToDisplay} {activeConnector?.name}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          disabled={isConnecting}
          onClick={
            account?.address
              ? () => disconnect()
              : () => {
                  setIsOpen((o) => !o);
                }
          }
        >
          {account?.address ? "Disconnect" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
