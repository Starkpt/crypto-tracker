import { useEffect, useMemo, useState } from "react";

import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import useSWR from "swr";
import _ from "lodash";

import { fetcher } from "../utils/fetcher";

import { ICurrency, IMarketCoin } from "../types/types";

const marketsURL = "/api/markets";

const params = { order: "market_cap_rank_desc", per_page: "5" };
const fetcherOptions = { refreshInterval: 60000 };

const rowsPerPage = 10;

export default function SearchCoins({
  selectedCurrency,
}: {
  selectedCurrency: ICurrency;
}) {
  const [coinsList, setCoinsList] = useState<IMarketCoin[][]>([]);
  const [searchedCoins, setSearchedCoins] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [listIndex, setListIndex] = useState(0);

  const searchParams = new URLSearchParams({
    vs_currency: selectedCurrency.value,
    ...params,
  }).toString();

  const URL = `${marketsURL}?${searchParams}`;

  const {
    data,
    error,
    // isLoading,
    isValidating,
  } = useSWR<any[]>(URL, fetcher, fetcherOptions);

  useMemo(() => setCoinsList(_.chunk(data, rowsPerPage)), [data]);

  return (
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
            total={coinsList.length}
            onChange={(page) => {
              console.log(page);
              setPage(page);
              setListIndex(page - 1);
            }}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="price">PRICE</TableColumn>
        <TableColumn key="change24h">PRICE CHANGE 24h</TableColumn>
      </TableHeader>
      <TableBody
        // items={coinsList?.[page]}
        emptyContent={<Spinner />}
      >
        {coinsList[listIndex]?.map((coin) => (
          <TableRow key={coin.name}>
            <TableCell>{coin.name}</TableCell>
            <TableCell>{coin.current_price}</TableCell>
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
  );
}
