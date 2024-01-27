"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import banner from "../app/zkweb-banner-image.svg";
import Link from "next/link";

export default function Header({ onGrandparentData }: any) {
  const [parentSearchResults, setParentSearchResults] = useState([]);

  const handleParentData = (data: any) => {
    setParentSearchResults(data);
    onGrandparentData(data);
  };

  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="text-3xl lg:text-7xl !leading-tight mx-auto max-w-xl text-center font-sans font-bold antialiased">
        <Image
          src={banner}
          alt={"zkWeb"}
          width={2000}
          height={2000}
          className="h-2000 w-2000 flex-none rounded-lg object-cover ring-1 ring-gray-900/10"
        />
      </div>
      <div className="-mt-24 text-sm md:-mt-32 antialiased md:text-lg tracking-widest">
        Zero-knowledge proofs for everyone.
      </div>
      <Link href="https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#01ed3a7752f9488d9674b1c9509ba103">
        <button
          type="button"
          className="-mt-10 rounded-md bg-emerald-500 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Get Started ⚡︎
        </button>
      </Link>
      <SearchBar onSearchResults={handleParentData} />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
