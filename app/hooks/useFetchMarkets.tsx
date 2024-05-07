// LIBRARIES
import useSWR from "swr";

// UTILS
import { APIFetcher } from "@/app/utils/APIFetcher";
import { selectableCurrencies } from "@/app/utils/selectableCurrencies";

// TYPES
import { IAPIFetcher, ICoinSearch, ICurrency, ITrackedCoin } from "@/app/types/types";

function useFetchMarkets(
  {
    selectedCurrency = selectableCurrencies[1],
    queryParams,
    fetcher = APIFetcher,
    fetcherOptions = { refreshInterval: 60000 },
    trackedCoins,
  }: {
    selectedCurrency?: ICurrency;
    queryParams?: object;
    fetcher?: IAPIFetcher;
    fetcherOptions?: object;
    trackedCoins?: ITrackedCoin[];
  },
  delay?: number
) {
  const searchParams = new URLSearchParams({
    vs_currency: selectedCurrency.value,
    sparkline: "true",
    ...queryParams,
  });

  const { data, error, isValidating, isLoading, mutate } = useSWR<any[]>(
    `/api/markets?${searchParams.toString()}`,
    fetcher,
    { ...(fetcherOptions || { refreshInterval: delay }) }
  );

  const filteredList = data?.reduce((acc: ICoinSearch[], coin: ICoinSearch) => {
    acc.push({
      ...coin,
      isTracked: trackedCoins?.some((item: ITrackedCoin) => item.id === coin.id),
    });

    return acc;
  }, []);

  return {
    data: filteredList,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export default useFetchMarkets;
