"use client";
import { useState } from "react";
import Input from "./reuseable/Input";
import Button from "./reuseable/Button";
import { FaSearch } from "react-icons/fa";

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
    <div className="mt-2 flex items-center gap-1">
      <Input type="text" className="w-full" name="search" id="search" onChange={handleInputChange} placeholder="Find your proof..." />
      <Button icon onClick={handleSearch}><FaSearch className="h-4 w-4" /></Button>
    </div>
  );
}
