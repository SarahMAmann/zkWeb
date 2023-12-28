import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="text-3xl lg:text-7xl !leading-tight mx-auto max-w-xl text-center font-sans font-bold antialiased">
        zkWeb
      </div>
      <div className="-mt-8 antialiased text-lg">
        Zero-knowledge proofs for everyone.
      </div>
      <button
        type="button"
        className="-mt-10 rounded-md bg-indigo-800 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Get Started ⚡︎
      </button>
      <SearchBar />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
