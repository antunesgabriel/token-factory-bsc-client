import bscscan from "../assets/images/bscscan.webp";
import metamaskicon from "../assets/images/metamask.png";

type ButtonsHandleTokenProps = {
  onClikAddTokenToWallet: () => void;
  transactionHash: string;
  clearAll: () => void;
};

const ButtonsHandleToken: React.FC<ButtonsHandleTokenProps> = ({
  onClikAddTokenToWallet,
  transactionHash,
  clearAll,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={onClikAddTokenToWallet}
        className="btn bg-brand-primary flex items-center bg-opacity-10 mb-4 gap-3 w-full"
      >
        <img src={metamaskicon} className="h-5 w-5 ml-3" /> Add Token To your
        Wallet
      </button>

      <a
        href={`https://testnet.bscscan.com/tx/${transactionHash}`}
        className="btn bg-brand-secondary flex items-center bg-opacity-10 mb-4 gap-3 w-full"
        target="_blank"
      >
        <img src={bscscan} className="h-5 w-5 ml-3" /> See Transaction BSCScan
      </a>

      <button
        type="button"
        onClick={clearAll}
        className="btn bg-green-500 flex items-center bg-opacity-10 mb-4 gap-3 w-full"
      >
        Create a new token
      </button>
    </>
  );
};

export default ButtonsHandleToken;
