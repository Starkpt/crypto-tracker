// LIBRARIES
import useSWR from "swr";

// UTILS
import { APIFetcher } from "@/app/utils/APIFetcher";

// TYPES
import { ICurrency } from "@/app/types/types";
import { selectableCurrencies } from "@/app/utils/selectableCurrencies";

function useFetchMarkets(
  {
    selectedCurrency = selectableCurrencies[1],
    queryParams,
    fetcher = APIFetcher,
    fetcherOptions = { refreshInterval: 60000 },
  }: {
    selectedCurrency?: ICurrency;
    queryParams?: object;
    fetcher?: any;
    fetcherOptions?: object;
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

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export default useFetchMarkets;
