"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import logo from "../app/zkWeb-logo-svg.svg";

interface Proof {
  created_at: string;
  email: string;
  id: string;
  proof: string | null;
  title: string;
  verification_key: string | null;
}

export default function GridCards({ searchResults }: any) {
  const [data, setData] = useState<Proof[] | null>(null);

  useEffect(() => {
    const apiUrl = "/api/get-all-proofs";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((apiData) => {
        setData(apiData.proofs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (searchResults) {
      setData(searchResults);
    }
  }, [searchResults]);

  const formatDate = (isoDate: string) => {
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString("en-US", options);
  };

  return (
    <div className="-mt-6">
      {data ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
          {data?.map((proof: Proof) => (
            <Link
              href={{
                pathname: `/prover/[id]`,
                query: {
                  id: proof.id,
                },
              }}
              as={`/prover/${proof.id}`}
              key={proof.id}
            >
              <li
                key={proof.id}
                className="transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden rounded-xl border border-gray-800"
              >
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-800 p-6">
                  <Image
                    src={logo}
                    alt={proof.title}
                    width={16}
                    height={16}
                    className="h-16 w-16 flex-none rounded-lg object-cover"
                  />
                  <div className="text-sm font-medium leading-6 text-white">
                    {proof.title}
                  </div>
                </div>
                <dl className="bg-[#04090B] -my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                  <div className="flex py-3">
                    <dt className="text-gray-500 pr-2">Created</dt>
                    <dd className="text-orange-700 font-thin">
                      <time dateTime={proof.created_at}>
                        {formatDate(proof.created_at)}
                      </time>
                    </dd>
                  </div>
                </dl>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
}
