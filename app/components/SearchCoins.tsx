import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";

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
import useSearchCoins from "../hooks/useSearchCoins";

const rowsPerPage = 10;

export default function SearchCoins({ selectedCurrency }: { selectedCurrency: ICurrency }) {
  const [coinsList, setCoinsList] = useState<IMarketCoin[][]>([]);
  const [searchedList, setSearchedList] = useState<IMarketCoin[][]>([]);

  // TODO: improve pagination index logic
  const [page, setPage] = useState<number>(1);
  const [coinsListIndex, setCoinsListIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  // Handlers
  const handleSelectPage = (page: number) => {
    setPage(page);
    setCoinsListIndex(page - 1);
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);

    if (!e.target.value) {
      setSearchedList(coinsList);
    } else {
      setSearchedList([coinsList[0]]);
    }

    handleSelectPage(1);
  };

  const debouncedOnChange = debounce(handleOnChange, 1000);

  useFetchMarkets({ selectedCurrency, setCoinsList, setSearchedList }, 2000);
  useSearchCoins({ query: useMemo(() => searchValue, [searchValue]) });

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
              total={searchedList?.length}
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
          {searchedList?.[coinsListIndex]?.map((coin) => (
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
