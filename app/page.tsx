"use client";

// LIBRARIES
import { useEffect, useState } from "react";

// COMPONENTS
import NavigationBar from "@/app/components/NavigationBar";
import SearchCoins from "@/app/components/SearchCoins";
import TrackedCoins from "@/app/components/TrackedCoins";
import TrendingCoins from "@/app/components/TrendingCoins";

// HOOKS
import useFetchMarkets from "@/app/hooks/useFetchMarkets";

// UTILS
import { selectableCurrencies } from "@/app/utils/selectableCurrencies";

// TYPES
import { ICurrency } from "@/app/types/types";

export default function Home() {
  const [trackedCoins, setTrackedCoins] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>(
    () =>
      selectableCurrencies.find((currency) => currency.value === "eur") || selectableCurrencies[0]
  );

  // Custom hook fetching data
  const { data } = useFetchMarkets({ selectedCurrency }, 2000);

  useEffect(() => {
    const storedTrackedCoins = localStorage.getItem("trackedCoins");

    if (storedTrackedCoins) {
      setTrackedCoins(JSON.parse(storedTrackedCoins));
    }
  }, []);

  return (
    <div className="h-screen">
      <NavigationBar
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      <main className="flex flex-col h-full justify-between py-6 px-6 lg:px-32">
        <div className="flex flex-col h-full lg:flex-row gap-y-10 lg:gap-6">
          <div className="flex flex-col gap-6 lg:w-96">
            <TrendingCoins selectedCurrency={selectedCurrency} />

            {trackedCoins.length > 0 && (
              <TrackedCoins
                data={data}
                selectedCurrency={selectedCurrency}
                setTrackedCoins={setTrackedCoins}
                trackedCoins={trackedCoins}
              />
            )}
          </div>

          <SearchCoins
            // @ts-ignore
            data={data}
            selectedCurrency={selectedCurrency}
            setTrackedCoins={setTrackedCoins}
          />
        </div>
      </main>
    </div>
  );
}
