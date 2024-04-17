"use client";

import { useState } from "react";
import { ICurrencyItem, NavigationBar } from "./components/NavigationBar";
import SearchCoins from "./components/SearchCoins";
import { TrendingCoins } from "./components/Trending";
import { Selection } from "@nextui-org/react";

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState("eur");

  return (
    <>
      <NavigationBar
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      <main className="flex min-h-screen flex-col justify-between p-24">
        <div className="flex flex-row gap-3">
          <TrendingCoins />
          <SearchCoins selectedCurrency={selectedCurrency} />
        </div>
      </main>
    </>
  );
}
