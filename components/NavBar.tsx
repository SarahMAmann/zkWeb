import Link from "next/link";
import GenerateButton from "./GenerateButton";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/verifier">
          <GenerateButton />
        </Link>
        <Link
          href="/"
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Contribute
        </Link>
      </div>
    </nav>
  );
}
