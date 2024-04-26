"use client";

import { useMemo, useState } from "react";

import NavigationBar from "./components/NavigationBar";
import SearchCoins from "./components/SearchCoins";
import TrendingCoins from "./components/Trending";

import { selectableCurrencies } from "./utils/selectableCurrencies";

import { ICurrency } from "./types/types";

export default function Home() {
  const defaultCurrency: ICurrency = useMemo(
    () =>
      selectableCurrencies.find((currency) => currency.value === "eur") || selectableCurrencies[1],
    []
  );

  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>(defaultCurrency);

  return (
    <>
      <NavigationBar
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      <main className="flex min-h-screen flex-col justify-between py-6 px-6 lg:px-32">
        <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-6">
          <TrendingCoins selectedCurrency={selectedCurrency} />
          <SearchCoins selectedCurrency={selectedCurrency} />
        </div>
      </main>
    </>
  );
}
