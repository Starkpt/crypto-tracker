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
  query,
  fetcher = APIFetcher,
}: // coinsList,
{
  selectedCurrency?: ICurrency;
  query?: any; // requires values to be memoized with a useMemo
  fetcher?: any;
}) {
  const searchParams = `?${new URLSearchParams({ query }).toString()}`;
  const marketSearchParams = new URLSearchParams({
    vs_currency: selectedCurrency.value,
    sparkline: "true",
  });

  const {
    data: searchCryptos,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR<{ data: ISearchCryptos; marketsData: IMarketCoin[] }>(
    `/api/search${searchParams}`,
    fetcher
  );

  console.log(searchCryptos);

  const trackedCoins = localStorage.getItem("trackedCoins");
  const trackedCoinsJSON = useMemo(
    () => (trackedCoins ? JSON.parse(trackedCoins) : []),
    [trackedCoins]
  );

  const coinSearchList = useMemo(() => {
    if (!searchCryptos?.data?.coins?.length)
      return _.chunk(searchCryptos?.marketsData, ITEMS_PER_PAGE);

    const filteredList = searchCryptos.marketsData?.reduce(
      (acc: ICoinSearch[], coin: ICoinSearch) => {
        if (searchCryptos.data.coins.some((searchedCoin) => searchedCoin.id === coin.id)) {
          acc.push({
            ...coin,
            isTracked: trackedCoinsJSON.some((item: { id: string }) => item.id === coin.id),
          });
        }

        return acc;
      },
      []
    );

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
