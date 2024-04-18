"use client";

import { useState } from "react";
import { ICurrency, NavigationBar, currencies } from "./components/NavigationBar";
import SearchCoins from "./components/SearchCoins";
import { TrendingCoins } from "./components/Trending";

export default function Home() {
  const defaultCurrency: ICurrency =
    currencies.find((currency) => currency.value === "eur") || currencies[1];
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>(defaultCurrency);

  return (
    <>
      <NavigationBar
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      <main className="flex min-h-screen flex-col justify-between p-24">
        <div className="flex flex-row gap-3">
          <TrendingCoins selectedCurrency={selectedCurrency} />
          <SearchCoins selectedCurrency={selectedCurrency} />
        </div>
      </main>
    </>
  );
}
