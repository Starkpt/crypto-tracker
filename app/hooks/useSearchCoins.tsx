import { useRef } from "react";
import useSWR from "swr";
import { fetcher as APIFetcher } from "../utils/fetcher";

const searchURL = "/api/search";

const getURL = ({ query }: { query: string }) => {
  const searchParams = query ? new URLSearchParams({ query }).toString() : "";

  const searchPathURL = searchParams ? `?${searchParams}` : "";

  return `${searchURL}${searchPathURL}`;
};

function useSearchCoins({ query, fetcher = APIFetcher }: { query?: any; fetcher?: any }) {
  const { data, error, isValidating, isLoading, mutate } = useSWR<any[]>(
    getURL({ query }),
    fetcher
  );
}

export default useSearchCoins;
