import { useConnect } from "wagmi";
import ModalComponent, { ModalProps } from "./modal.component";

import metamaskLogo from "../assets/images/metamask.png";
import wcLogo from "../assets/images/wc.svg";

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
              {isConnectingWithConnector && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </ModalComponent>
  );
};

export default ModalConnectors;
