import { ChangeEventHandler, useMemo, useState } from "react";

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

import { SearchIcon } from "./SearchIcon";

import useFetchMarkets from "../hooks/useFetchData";
import useSearchCoins from "../hooks/useSearchCoins";

import { ICurrency, ISearchedCoins } from "../types/types";

export default function SearchCoins({ selectedCurrency }: { selectedCurrency: ICurrency }) {
  // TODO: improve pagination index logic
  const [page, setPage] = useState<number>(1);
  const [coinsListIndex, setCoinsListIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  // Data fetching hooks
  const { data } = useFetchMarkets({ selectedCurrency }, 2000);

  const { data: searchedCoins } = useSearchCoins({
    query: useMemo(() => searchValue, [searchValue]),
  });

  // Handlers
  const handleSelectPage = (page: number) => {
    setPage(page);
    setCoinsListIndex(page - 1);
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);

    handleSelectPage(1);
  };

  const debouncedOnChange = debounce(handleOnChange, 1800);

  const coinsList = useMemo(() => {
    const CHUNK_SIZE = 10;

    if (data && searchedCoins?.length) {
      const filteredList = data.filter((coin) =>
        searchedCoins.some((searchedCoin: ISearchedCoins) => searchedCoin.id === coin.id)
      );

      return _.chunk(filteredList, CHUNK_SIZE);
    }

    return _.chunk(data, CHUNK_SIZE);
  }, [data, searchedCoins]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="font-semibold text-xl h-10">Cryptocurrencies</h3>
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
                total={coinsList?.length}
                onChange={handleSelectPage}
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
            {coinsList?.[coinsListIndex]?.map((coin) => (
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
    </div>
  );
}
