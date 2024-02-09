import Link from "next/link";
import Image from "next/image";
import logo from "../app/zkWeb-logo-svg.svg";
import Button from "./reuseable/Button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between md:px-20 lg:px-32 gap-2 py-1 border-b border-btn-background px-6 w-full">
      <div className="flex gap-4 items-center">
        <Link href="/" className="-mb-1">
          <Image src={logo} alt={"logo"} width={16} height={16} className="h-16 rounded-lg object-cover" />
        </Link>
        <Button variant="secondary" asLink href="/verifier">Generate A Proof</Button>
      </div>
      <div>
        <Button asLink href="https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#d74f5a34ff024944a4274ff8f93ab8ac">Contribute</Button>
      </div>
    </nav >
  );
}
