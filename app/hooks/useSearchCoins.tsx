import { useRef } from "react";
import useSWR from "swr";
import { fetcher as APIFetcher } from "../utils/fetcher";
import { IMarketCoin } from "../types/types";

const searchURL = "/api/search";

const getURL = ({ query }: { query: string }) => {
  const searchParams = query ? new URLSearchParams({ query }).toString() : "";

  const searchPathURL = searchParams ? `?${searchParams}` : "";

  return `${searchURL}${searchPathURL}`;
};

function useSearchCoins({
  query,
  fetcher = APIFetcher,
}: // coinsList,
{
  query?: any; // requires values to be memoized with a useMemo
  fetcher?: any;
}) {
  const { data, error, isValidating, isLoading, mutate } = useSWR<any[]>(
    getURL({ query }),
    fetcher
  );

  return { data: data?.coins, error, isValidating, isLoading, mutate };
}

export default useSearchCoins;
