"use client";
import { useState } from "react";

export default function SearchBar({ onSearchResults }: any) {
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleSearch = async (e: { preventDefault: () => void }) => {
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchText: searchText,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onSearchResults(data.data);
      }
    } catch (error) {
      console.error("There was an error trying to process this search.");
    }
  };

  return (
    <div>
      <div className="relative mt-2 flex items-center">
        <div>
          <input
            type="text"
            name="search"
            id="search"
            onChange={handleInputChange}
            placeholder="Find your proof..."
            className="block w-80 rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="cursor-pointer absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <button
            onClick={handleSearch}
            type="button"
            className="cursor-pointer bg-gray-200 rounded-sm"
          >
            <kbd className="-mt-2 inline-flex items-center rounded border  px-1 font-sans text-lg text-gray-400">
              ⌕
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
