"use client";

import { useEffect, useMemo, useState } from "react";

import NavigationBar from "./components/NavigationBar";
import SearchCoins from "./components/SearchCoins";
import TrackedCoins from "./components/TrackedCoins";
import TrendingCoins from "./components/TrendingCoins";

import { selectableCurrencies } from "./utils/selectableCurrencies";

import { ICurrency } from "./types/types";
import useFetchMarkets from "./hooks/useFetchData";

export default function Home() {
  const defaultCurrency: ICurrency = useMemo(
    () =>
      selectableCurrencies.find((currency) => currency.value === "eur") || selectableCurrencies[1],
    []
  );

  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>(defaultCurrency);

  const [trackedCoins, setTrackedCoins] = useState([]);

  const { data } = useFetchMarkets({ selectedCurrency }, 2000);

  useEffect(() => {
    const localCoins = localStorage.getItem("trackedCoins");

    if (localCoins) {
      setTrackedCoins(JSON.parse(localCoins));
    }
  }, []);

  return (
    <>
      <NavigationBar
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      <main className="flex min-h-screen flex-col justify-between py-6 px-6 lg:px-32">
        <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-6">
          <div className="flex flex-col gap-6 lg:w-96">
            <TrendingCoins selectedCurrency={selectedCurrency} />
            <TrackedCoins
              data={data}
              selectedCurrency={selectedCurrency}
              setTrackedCoins={setTrackedCoins}
              trackedCoins={trackedCoins}
            />
          </div>

          <SearchCoins
            data={data}
            selectedCurrency={selectedCurrency}
            setTrackedCoins={setTrackedCoins}
          />
        </div>
      </main>
    </>
  );
}
