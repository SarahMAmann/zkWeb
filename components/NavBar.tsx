import Link from "next/link";
import GenerateButton from "./GenerateButton";
import Image from "next/image";
import logo from "../app/zkWeb-logo-svg.svg";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="flex md:-ml-32">
          <Link href="/">
            <Image
              src={logo}
              alt={"logo"}
              width={16}
              height={16}
              className="h-16 w-16 flex-none rounded-lg object-cover ring-1 ring-gray-900/10"
            />
          </Link>
          <Link href="/verifier" className="mt-3">
            <GenerateButton />
          </Link>
        </div>
        <div className="flex">
        <Link
          href="https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#d74f5a34ff024944a4274ff8f93ab8ac"
          className="md:-mr-24 py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Contribute
        </Link>
        <button className="ml-4 md:ml-32 -mt-4 font-mono text-xs md:text-sm text-emerald-500 cursor-auto">Beta 🔬</button>
        </div>
        {/* <button className="ml-auto">Beta</button> */}
      </div>
      {/* <button className="ml-auto">Beta</button> */}
    </nav>
  );
}
