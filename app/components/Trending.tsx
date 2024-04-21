import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import Image from "next/image";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { ICurrency } from "../types/types";
import { fetcher } from "../utils/fetcher";

const baseURL = "/api/markets";

const params = { order: "market_cap_rank_desc", per_page: "5" };
const fetcherOptions = { refreshInterval: 60000 };

export const TrendingCoins = ({ selectedCurrency }: { selectedCurrency: ICurrency }) => {
  const [marketCoins, setMarketCoins] = useState<any[]>([]);

  const searchParams = new URLSearchParams({
    vs_currency: selectedCurrency.value || "eur",
    ...params,
  }).toString();

  const URL = `${baseURL}?${searchParams}`;

  const { data, error, isLoading, isValidating } = useSWR(URL, fetcher, fetcherOptions);

  useMemo(() => setMarketCoins(data), [data]);

  return (
    <Table
      className="w-96"
      selectionMode="single"
      // defaultSelectedKeys={["1"]}
      aria-label="Top 5 crypto currencies"
    >
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>COIN</TableColumn>
        <TableColumn>CURRENT PRICE</TableColumn>
      </TableHeader>
      <TableBody isLoading={isValidating} emptyContent={<Spinner />}>
        {marketCoins?.map((coin: any, id: number) => (
          <TableRow key={id}>
            <TableCell>{coin.market_cap_rank}</TableCell>
            <TableCell className="flex gap-2">
              <Image src={coin.image} alt={coin.name} width={25} height={25} />
              <p className="font-medium">{coin.name}</p>
              <p className="text-metal uppercase">{coin.symbol}</p>
            </TableCell>
            <TableCell>
              {selectedCurrency.symbol} {coin.current_price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
