// LIBRARIES
import useSWR from "swr";

// UTILS
import { APIFetcher } from "@/app/utils/APIFetcher";

// TYPES
import { ISearchCryptos } from "@/app/types/types";

const searchURL = "/api/search";

function useSearchCoins({
  query,
  fetcher = APIFetcher,
}: // coinsList,
{
  query?: any; // requires values to be memoized with a useMemo
  fetcher?: any;
}) {
  const searchParams = query ? `?${new URLSearchParams({ query }).toString()}` : "";

  const { data, error, isValidating, isLoading, mutate } = useSWR<ISearchCryptos>(
    `${searchURL}${searchParams}`,
    fetcher
  );

  return { data: data?.coins, error, isValidating, isLoading, mutate };
}

export default useSearchCoins;
