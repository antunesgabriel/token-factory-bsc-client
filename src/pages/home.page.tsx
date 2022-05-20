import { useWeb3React } from "@web3-react/core";

function HomePage() {
  const { active } = useWeb3React();

  return (
    <div className="flex-1 flex justify-center items-center">
      <form className="bg-brand-black3 max-w-sm h-2/5 w-full py-8 px-4 m-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-brand-gray3 text-center">
          Create Your Token
        </h2>
      </form>
    </div>
  );
}

export default HomePage;
