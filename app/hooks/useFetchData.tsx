import { useState, useEffect, useRef, useMemo } from "react";
import useSWR from "swr";
import { ICurrency } from "../types/types";
import { fetcher as APIFetcher } from "../utils/fetcher";
import _ from "lodash";

const marketsURL = "/api/markets";
const searchURL = "/api/search";

const params = {
  // order: "market_cap_rank_desc",
  // per_page: "5",
};
const defaultFetcherOptions = { refreshInterval: 60000 };

const getURL = ({
  selectedCurrency = "eur",
  params,
}: {
  selectedCurrency: ICurrency | string;
  params: object;
}) => {
  const searchParams = new URLSearchParams({
    vs_currency: selectedCurrency.value || selectedCurrency,
    ...params,
  }).toString();

  return `${marketsURL}?${searchParams}`;
};

function useFetchMarkets(
  {
    selectedCurrency,
    fetcher = APIFetcher,
    fetcherOptions = defaultFetcherOptions,
    setCoinsList,
    setSearchedList,
  }: {
    selectedCurrency: ICurrency;
    fetcher?: any;
    fetcherOptions?: object;
    setCoinsList?: any;
    setSearchedList?: any;
  },
  delay?: number
) {
  const { data, error, isValidating, isLoading, mutate } = useSWR<any[]>(
    getURL({ selectedCurrency: selectedCurrency.value, params }),
    fetcher,
    fetcherOptions
  );

  useMemo(() => {
    setCoinsList(_.chunk(data, 10));
    setSearchedList(_.chunk(data, 10));
  }, [data, setCoinsList, setSearchedList]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export default useFetchMarkets;
