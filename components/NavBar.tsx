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
        <Link
          href="/"
          className="md:-mr-24 py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Contribute
        </Link>
      </div>
    </nav>
  );
}
