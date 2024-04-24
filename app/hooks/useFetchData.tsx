import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { ICurrency } from "../types/types";

const marketsURL = "/api/markets";
const searchURL = "/api/search";

const params = {
  // order: "market_cap_rank_desc",
  // per_page: "5",
};
const fetcherOptions = { refreshInterval: 60000 };

const getURL = ({
  selectedCurrencyValue,
  params,
}: {
  selectedCurrencyValue: string;
  params: object;
}) => {
  const searchParams = new URLSearchParams({
    vs_currency: selectedCurrencyValue,
    ...params,
  }).toString();

  return `${marketsURL}?${searchParams}`;
};

function useFetchMarkets(
  {
    selectedCurrency,
    fetcher,
    fetcherOptions,
    callback,
  }: {
    selectedCurrency: ICurrency;
    fetcher?: any;
    fetcherOptions?: object;
    callback?: any;
  },
  delay: number
) {
  const savedCallback = useRef();

  const {
    data,
    error,
    // isLoading,
    isValidating,
  } = useSWR<any[]>(
    getURL({ selectedCurrencyValue: selectedCurrency.value, params }),
    fetcher,
    fetcherOptions
  );

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();

      console.log("hey tick");
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useFetchMarkets;

// function useInterval({
//   selectedCurrency,
//   fetcher,
//   fetcherOptions,
//   callback
//   delay,
// }: {
//   selectedCurrency?: object;
//   fetcher?: any;
//   fetcherOptions?: object;
//   callback: any
//   delay: number;
// }) {
//   const savedCallback = useRef();

//   const {
//     data,
//     error,
//     // isLoading,
//     isValidating,
//   } = useSWR<any[]>(
//     getURL({ selectedCurrencyValue: selectedCurrency.value, params }),
//     fetcher,
//     fetcherOptions
//   );

//   // // Remember the latest callback.
//   // useEffect(() => {
//   //   savedCallback.current = callback;
//   // }, [callback]);

//   // // Set up the interval.
//   // useEffect(() => {
//   //   function tick() {
//   //     savedCallback.current();
//   //   }
//   //   if (delay !== null) {
//   //     let id = setInterval(tick, delay);
//   //     return () => clearInterval(id);
//   //   }
//   // }, [delay]);
// }

// export default useInterval;
