// REACT
import { useMemo } from "react";

// LIBRARIES
import _ from "lodash";
import useSWR from "swr";

// UTILS
import { APIFetcher } from "@/app/utils/APIFetcher";
import { selectableCurrencies } from "@/app/utils/selectableCurrencies";

// TYPES
import { ICoinSearch, ICurrency, IMarketCoin, ISearchCryptos } from "@/app/types/types";

const ITEMS_PER_PAGE = 10;

function useSearchCoins({
  selectedCurrency = selectableCurrencies[1],
  searchValue = "",
  fetcher = APIFetcher,
}: // coinsList,
{
  selectedCurrency?: ICurrency;
  searchValue?: any; // requires values to be memoized with a useMemo
  fetcher?: any;
}) {
  const searchParams = `?${new URLSearchParams({
    query: searchValue,
    vs_currency: selectedCurrency.value,
    sparkline: "true",
  }).toString()}`;

  const {
    data: searchCryptos,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR<{ coinsSearch: ISearchCryptos; markets: IMarketCoin[] }>(
    `/api/search${searchParams}`,
    fetcher
  );

  const trackedCoins = localStorage.getItem("trackedCoins");
  const trackedCoinsJSON = useMemo(
    () => (trackedCoins ? JSON.parse(trackedCoins) : []),
    [trackedCoins]
  );

  const coinSearchList = useMemo(() => {
    if (!searchCryptos?.coinsSearch?.coins?.length)
      return _.chunk(searchCryptos?.markets, ITEMS_PER_PAGE);

    const filteredList = searchCryptos.markets?.reduce((acc: ICoinSearch[], coin: ICoinSearch) => {
      if (searchCryptos.coinsSearch.coins.some((searchedCoin) => searchedCoin.id === coin.id)) {
        acc.push({
          ...coin,
          isTracked: trackedCoinsJSON.some((item: { id: string }) => item.id === coin.id),
        });
      }

      return acc;
    }, []);

    return _.chunk(filteredList, ITEMS_PER_PAGE);
  }, [searchCryptos, trackedCoinsJSON]);

  return {
    data: coinSearchList,
    error,
    isValidating,
    isLoading,
    mutate,
  };
}

export default useSearchCoins;
