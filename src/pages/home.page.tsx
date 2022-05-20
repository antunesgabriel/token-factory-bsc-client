import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useCallback, useMemo, useState } from "react";

import contractData from "../assets/json/TokenFactory.json";
import InputComponent from "../components/input.component";

const ABI = contractData.abi;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

function HomePage() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const [transactionHash, setTransactionHash] = useState("");

  const { account } = useWeb3React();

  const contract = useMemo(() => {
    if (!account) {
      return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  }, [account]);

  const onSubmit = useCallback(async () => {
    if (!account) {
      return alert("Connect your Metamask wallet");
    }

    if (!tokenName || !tokenSupply || !tokenSupply) {
      return alert("Fill all fields");
    }

    try {
      setInProgress(true);
      const trx = await contract?.generateToken(
        tokenName,
        tokenSymbol,
        Number(tokenSupply)
      );

      await trx.wait();

      console.info("Minerado...", trx.hash);

      setTokenName("");
      setTokenSymbol("");
      setTokenSupply("");

      setTransactionHash(trx.hash);
    } catch (err) {
      console.log(err);
    } finally {
      setInProgress(false);
    }
  }, [account]);

  const onChangeSymbol = ($e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = $e.target;

    setTokenSymbol(value.trim().toUpperCase());

    if (transactionHash) {
      setTransactionHash("");
    }
  };

  const onChangeTokenName = ($e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = $e.target;

    setTokenName(value);

    if (transactionHash) {
      setTransactionHash("");
    }
  };

  const onChangeTokenSupply = ($e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = $e.target;

    const supply = value.trim().replace(/\D/gi, "");

    setTokenSupply(supply);

    if (transactionHash) {
      setTransactionHash("");
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <form className="max-w-sm h-2/5 w-full py-8 px-4 m-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-brand-gray3 text-center mb-10">
          Create Your Token:
        </h2>

        {!!transactionHash && (
          <a
            href={`https://testnet.bscscan.com/tx/${transactionHash}`}
            className="text-green-500 text-center text-sm mb-5 block underline"
            target="_blank"
          >
            See your token in TestNet BSCScan:{" "}
            {`${transactionHash.slice(0, 4)}...${transactionHash.slice(-4)}`}
          </a>
        )}

        <InputComponent
          name="tokenName"
          placeholder="Token Name"
          className="mb-5"
          onChange={onChangeTokenName}
          value={tokenName}
        />

        <InputComponent
          name="tokenSymbol"
          placeholder="Token Symbol"
          value={tokenSymbol}
          className="mb-5"
          onChange={onChangeSymbol}
        />

        <InputComponent
          name="tokenSupply"
          placeholder="Token Supply"
          value={tokenSupply}
          onChange={onChangeTokenSupply}
        />

        <button
          type="button"
          className="btn btn-primary mt-7 mx-auto"
          onClick={onSubmit}
          disabled={inProgress}
        >
          {inProgress ? "Creating..." : "Generate My Token"}
        </button>
      </form>
    </div>
  );
}

export default HomePage;
