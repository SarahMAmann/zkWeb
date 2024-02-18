"use client";
import Header from "@/components/Header";
import GridCards from "@/components/GridCards";
import { useState } from "react";

export default function Index() {
  const [grandparentSearchResults, setGrandparentSearchResults] = useState([]);

  const handleGrandparentSearchResults = (data: any) => {
    setGrandparentSearchResults(data);
  };

  return (
    <div className="grid place-items-center py-20 px-6">
      <Header onGrandparentData={handleGrandparentSearchResults} />
      <GridCards searchResults={grandparentSearchResults} />
    </div>
  );
}
