import { useConnect } from "wagmi";
import ModalComponent, { ModalProps } from "./modal.component";

import metamaskLogo from "../assets/images/metamask.png";
import wcLogo from "../assets/images/wc.svg";
import SpinnerComponent from "./spinner.component";

const MAP_ICONS_CONNECTORS: { [key: string]: any } = {
  metaMask: metamaskLogo,
  walletConnect: wcLogo,
};

const MAP_CLASS_CONNECTORS: { [key: string]: string } = {
  metaMask:
    " bg-orange-200 bg-opacity-5 transition ease-in-out duration-150 hover:bg-opacity-20",
  walletConnect:
    " bg-indigo-200 bg-opacity-5 transition ease-in-out duration-150 hover:bg-opacity-20",
};

const ModalConnectors: React.FC<ModalProps> = ({
  isOpen,
  describe,
  onClose,
  className,
  title,
}) => {
  const { connect, connectors, isConnecting, pendingConnector } = useConnect({
    onConnect: () => {
      onClose && onClose();
    },
  });

  return (
    <ModalComponent
      isOpen={isOpen}
      describe={describe}
      title={title}
      onClose={onClose}
      className={className}
    >
      <div className="w-full mt-5 flex flex-col">
        {connectors.map((x) => {
          const isConnectingWithConnector =
            isConnecting && pendingConnector?.id === x.id;

          return (
            <button
              disabled={!x.ready || isConnectingWithConnector}
              key={x.id}
              onClick={() => connect(x)}
              className={`my-2 w-full btn inline-flex items-center px-4 py-2
              font-semibold leading-6 text-sm shadow rounded-md bg-opacity-5 ${
                MAP_CLASS_CONNECTORS[x.id]
              }`}
            >
              <img src={MAP_ICONS_CONNECTORS[x.id]} className="h-5 w-5 mr-3" />
              {x.name}&nbsp;&nbsp;&nbsp;
              {isConnectingWithConnector && <SpinnerComponent />}
            </button>
          );
        })}
      </div>
    </ModalComponent>
  );
};

export default ModalConnectors;
