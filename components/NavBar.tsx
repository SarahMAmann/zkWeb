import Link from "next/link";
import GenerateButton from "./GenerateButton";
import Image from "next/image";
import logo from "../app/zkWeb-logo-svg.svg";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full flex justify-center h-16">
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
        <div className="hidden md:flex">
          <Link
            href="https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#01ed3a7752f9488d9674b1c9509ba103"
            className="mr-4 rounded-md bg-orange-600 md:px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Get Started ⚡︎
          </Link>
          <Link
            href="https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#d74f5a34ff024944a4274ff8f93ab8ac"
            className="md:-mr-24 py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border"
          >
            Contribute
          </Link>
          {/* <button className="ml-4 md:ml-32 -mt-4 font-mono text-xs md:text-sm text-emerald-500 cursor-auto">Beta 🔬</button> */}
        </div>

        <div className="md:hidden">
          <div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          {isMenuOpen ? (
            <Menu>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                show={isMenuOpen}
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <div className="py-3 flex justify-center">
                      <Link
                        href="https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#01ed3a7752f9488d9674b1c9509ba103"
                        className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
                      >
                        Get Started ⚡︎
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="py-3 flex justify-center">
                      <Link
                        href="https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#d74f5a34ff024944a4274ff8f93ab8ac"
                        className="py-2 px-3 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover border"
                      >
                        Contribute
                      </Link>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
}
