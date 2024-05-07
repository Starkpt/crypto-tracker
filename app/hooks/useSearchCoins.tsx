// REACT
import { useMemo } from "react";

// LIBRARIES
import _ from "lodash";
import useSWR from "swr";

// UTILS
import { APIFetcher } from "@/app/utils/APIFetcher";
import { TABLE_ITEMS_PER_PAGE } from "@/app/utils/misc";
import { selectableCurrencies } from "@/app/utils/selectableCurrencies";

// TYPES
import {
  IAPIFetcher,
  ICoinSearch,
  ICurrency,
  IMarketCoin,
  ISearchCryptos,
} from "@/app/types/types";

function useSearchCoins({
  selectedCurrency = selectableCurrencies[1],
  searchValue = "",
  trackedCoins,
  fetcher = APIFetcher,
}: // coinsList,
{
  selectedCurrency?: ICurrency;
  searchValue?: string | "" | undefined;
  trackedCoins?: any[];
  fetcher?: IAPIFetcher;
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

  const coinSearchList = useMemo(() => {
    if (!searchCryptos?.coinsSearch?.coins?.length)
      return _.chunk(searchCryptos?.markets, TABLE_ITEMS_PER_PAGE);

    const filteredList = searchCryptos.markets?.reduce((acc: ICoinSearch[], coin: ICoinSearch) => {
      if (searchCryptos.coinsSearch.coins.some((searchedCoin) => searchedCoin.id === coin.id)) {
        acc.push({
          ...coin,
          isTracked: trackedCoins?.some((item: { id: string }) => item.id === coin.id),
        });
      }

      return acc;
    }, []);

    return _.chunk(filteredList, TABLE_ITEMS_PER_PAGE);
  }, [searchCryptos, trackedCoins]);

  return {
    data: coinSearchList,
    error,
    isValidating,
    isLoading,
    mutate,
  };
}

export default useSearchCoins;
