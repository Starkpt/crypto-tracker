"use client";

import { useMemo, useState } from "react";
import { NavigationBar } from "./components/NavigationBar";
import SearchCoins from "./components/SearchCoins";
import { TrendingCoins } from "./components/Trending";
import { ICurrency } from "./types/types";
import { selectableCurrencies } from "./utils/selectableCurrencies";

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

      <main className="flex min-h-screen flex-col justify-between p-24">
        <div className="flex flex-row gap-3">
          <TrendingCoins selectedCurrency={selectedCurrency} />
          <SearchCoins selectedCurrency={selectedCurrency} />
        </div>
      </main>
    </>
  );
}
