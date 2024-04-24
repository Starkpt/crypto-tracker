import { ChangeEventHandler, useEffect, useMemo, useState } from "react";

import {
  Image,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import _, { debounce } from "lodash";
import useSWR from "swr";

import { fetcher } from "../utils/fetcher";

import { ICurrency, IMarketCoin } from "../types/types";
import { SearchIcon } from "./SearchIcon";
import Fuse from "fuse.js";
import useFetchMarkets from "../hooks/useFetchData";

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

const rowsPerPage = 10;

export default function SearchCoins({ selectedCurrency }: { selectedCurrency: ICurrency }) {
  const [coinsList, setCoinsList] = useState<IMarketCoin[][]>([]);
  const [searchedList, setSearchedList] = useState<IMarketCoin[][]>([]);

  // TODO: improve pagination index logic
  const [page, setPage] = useState<number>(1);
  const [coinsListIndex, setCoinsListIndex] = useState(page - 1);

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

  useMemo(() => setCoinsList(_.chunk(data, rowsPerPage)), [data]);
  useMemo(() => setSearchedList(coinsList), [coinsList]);

  const handleSelectPage = (page: number) => {
    setPage(page);
    setCoinsListIndex(page - 1);
  };

  // const a = useFetchMarkets({ callback: () => console.log("callback"), selectedCurrency }, 2000);

  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["name", "symbol"],
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log("Changed value:", e.target.value);

    if (!data) return;

    const fuse = new Fuse(data, fuseOptions);
    console.log(data);
    console.log(fuse.search(e.target.value));

    if (!e.target.value) {
      setSearchedList(coinsList);
    } else {
      // TODO: add code to search

      // TODO: change value being passed
      setSearchedList([coinsList[1]]);
    }

    handleSelectPage(1);
  };

  const debouncedOnChange = debounce(handleOnChange, 1000);

  useEffect(() => {
    if (coinsList.length > 1) setPage(1);
  }, [coinsList.length]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Input
        classNames={{
          base: "max-w-full h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        onChange={debouncedOnChange}
      />

      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              initialPage={page}
              total={searchedList.length}
              onChange={(page) => handleSelectPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px] rounded-small",
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="price">PRICE</TableColumn>
          <TableColumn key="change24h">PRICE CHANGE 24h</TableColumn>
        </TableHeader>
        <TableBody
          // items={searchedList?.[page]}
          emptyContent={<Spinner />}
        >
          {searchedList[coinsListIndex]?.map((coin) => (
            <TableRow key={coin.name}>
              <TableCell className="flex gap-2">
                <Image src={coin.image} alt={coin.name} width={25} height={25} />
                <p className="font-medium">{coin.name}</p>
                <p className="text-metal uppercase">{coin.symbol}</p>
              </TableCell>
              <TableCell>
                {selectedCurrency.symbol} {coin.current_price}
              </TableCell>
              <TableCell>{coin.price_change_24h}</TableCell>
            </TableRow>
          ))}

          {/* {(item: IMarketCoin) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
        )} */}
        </TableBody>
      </Table>
    </div>
  );
}
