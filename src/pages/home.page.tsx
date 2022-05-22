import { useWeb3React } from "@web3-react/core";
import { ethers, Event } from "ethers";
import { useCallback, useMemo, useState } from "react";

import contractData from "../assets/json/TokenFactory.json";
import ButtonsHandleToken from "../components/buttons-handle-token.component";
import InputComponent from "../components/input.component";

const ABI = contractData.abi;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

function HomePage() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const [newContractAddress, setNewContractAddress] = useState("");
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

    if (!tokenName.trim() || !tokenSupply.trim() || !tokenSupply.trim()) {
      return alert("Fill all fields");
    }

    try {
      setInProgress(true);
      const trx = await contract?.generateToken(
        tokenName,
        tokenSymbol,
        Number(tokenSupply)
      );

      const recipe = await trx.wait();

      setNewContractAddress((recipe?.events as Event[])?.[0].address);
      setTransactionHash(trx.hash);
    } catch (err) {
      console.log(err);
    } finally {
      setInProgress(false);
    }
  }, [account, tokenName, tokenSupply, tokenSymbol]);

  const addTokenToWallet = useCallback(async () => {
    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: newContractAddress,
            symbol: tokenSymbol,
            decimals: 18,
            image: "",
          },
        },
      });
      console.log(wasAdded);
    } catch (err) {
      console.log((err as Error).message);
    }
  }, []);

  const clearAll = () => {
    setTokenName("");
    setTokenSupply("");
    setTokenSymbol("");
    setNewContractAddress("");
    setTransactionHash("");
  };

  const onChangeSymbol = ($e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = $e.target;

    setTokenSymbol(value.trim().toUpperCase());
  };

  const onChangeTokenName = ($e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = $e.target;

    setTokenName(value);
  };

  const onChangeTokenSupply = ($e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = $e.target;

    const supply = value.trim().replace(/\D/gi, "");

    setTokenSupply(supply);
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <form className="max-w-sm h-2/5 w-full py-8 px-4 m-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-brand-gray3 text-center mb-10">
          Create Your Token:
        </h2>

        {Boolean(transactionHash) && Boolean(newContractAddress) && (
          <ButtonsHandleToken
            transactionHash={transactionHash}
            onClikAddTokenToWallet={addTokenToWallet}
            clearAll={clearAll}
          />
        )}

        {!transactionHash && !newContractAddress && (
          <>
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
          </>
        )}
      </form>
    </div>
  );
}

export default HomePage;
