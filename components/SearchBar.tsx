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
    <form className="w-3/4 mx-auto">   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input onChange={handleInputChange} type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Proofs..." required />
          <button onClick={handleSearch} type="button" className="hover:animate-pulse text-white absolute end-2.5 bottom-2.5 bg-gray-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-blue-800">Search</button>
      </div>
    </form>
  );
}
