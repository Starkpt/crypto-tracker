import { useMemo } from "react";

import _ from "lodash";
import useSWR from "swr";

import { fetcher as APIFetcher } from "../utils/fetcher";

import { ICurrency } from "../types/types";
const defaultFetcherOptions = { refreshInterval: 60000 };

const getURL = ({ selectedCurrency = "eur" }: { selectedCurrency: ICurrency | string }) => {
  const searchParams = new URLSearchParams({
    vs_currency: selectedCurrency.value || selectedCurrency,
    sparkline: "true",
  }).toString();

  return `/api/markets?${searchParams}`;
};

function useFetchMarkets(
  {
    selectedCurrency,
    fetcher = APIFetcher,
    fetcherOptions = defaultFetcherOptions,
  }: {
    selectedCurrency: ICurrency;
    fetcher?: any;
    fetcherOptions?: object;
  },
  delay?: number
) {
  const { data, error, isValidating, isLoading, mutate } = useSWR<any[]>(
    getURL({ selectedCurrency: selectedCurrency.value }),
    fetcher,
    fetcherOptions
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
