import { ChangeEventHandler, useMemo, useState } from "react";

import {
  Button,
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
import _, { debounce, extend } from "lodash";
import Image from "next/image";

import starFilled from "@/public/star-filled.svg";
import starOutlined from "@/public/star-outlined.svg";
import { SearchIcon } from "./SearchIcon";

import useSearchCoins from "../hooks/useSearchCoins";

import { ICoinSearch, ICurrency, IMarketCoin, ISearchedCoins } from "../types/types";

import { handleTrackedCoin } from "../utils/handleTrackedCoins";
import { PressEvent, usePress } from "@react-aria/interactions";

export default function SearchCoins({
  selectedCurrency,
  setTrackedCoins,
  data,
}: {
  selectedCurrency: ICurrency;
  setTrackedCoins: any;
  data: any;
}) {
  // TODO: improve pagination index logic
  const [page, setPage] = useState<number>(1);
  const [coinsListIndex, setCoinsListIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  let { pressProps } = usePress({
    onPress: (e: PressEvent) => handleTrackedCoin(e, setTrackedCoins),
  });

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


  // Coin Search
  const trackedCoins = localStorage.getItem("trackedCoins");

  const coinSearchList: ICoinSearch[][] = useMemo(() => {
    const ITEMS_PER_PAGE = 10;
    const trackedCoinsJSON = trackedCoins ? JSON.parse(trackedCoins) : [];

    if (!data) return [];

    let filteredList: ICoinSearch[] = data;

    if (searchedCoins?.length) {
      filteredList = data
        .filter((coin: IMarketCoin) =>
          searchedCoins.some((searchedCoin: ISearchedCoins) => searchedCoin.id === coin.id)
        )
        .map((coin: IMarketCoin) => {
          const isTracked = trackedCoinsJSON.some((item: { id: string }) => item.id === coin.id);

          return { ...coin, isTracked };
        });
    } else {
      filteredList = data.map((coin: IMarketCoin) => {
        const isTracked = trackedCoinsJSON.some((item: { id: string }) => item.id === coin.id);

        return { ...coin, isTracked };
      });
    }

    return _.chunk(filteredList, ITEMS_PER_PAGE);
  }, [data, searchedCoins, trackedCoins]);

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
                total={coinSearchList?.length}
                onChange={handleSelectPage}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px] rounded-small",
          }}
        >
          <TableHeader>
            <TableColumn key="track"> </TableColumn>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="price">PRICE</TableColumn>
            <TableColumn key="change24h">PRICE CHANGE 24h</TableColumn>
          </TableHeader>
          <TableBody
            // items={searchedList?.[page]}
            emptyContent={<Spinner />}
          >
            {coinSearchList?.[coinsListIndex]?.map((coin) => (
              <TableRow key={coin.name}>
                <TableCell width={20} className="p-1">
                  <Button
                    id={coin.id}
                    isIconOnly
                    size="sm"
                    className="flex bg-transparent hover:bg-purple rounded-sm"
                    {...pressProps}
                  >
                    {coin.isTracked ? (
                      <Image src={starFilled} alt="Tracked" width={25} height={25} />
                    ) : (
                      <Image src={starOutlined} alt="Untracked" width={25} height={25} />
                    )}
                  </Button>
                </TableCell>
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
