import { useMemo, useState } from "react";

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
import useSWR from "swr";

export default function TrackedCoins() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-xl h-10">Tracked Coins</h3>

      {/* <Table
        classNames={{
          wrapper: "rounded-small",
        }}
        fullWidth
        // selectionMode="single"
        // defaultSelectedKeys={["1"]}
        aria-label="Top 5 crypto currencies"
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>COIN</TableColumn>
          <TableColumn>CURRENT PRICE</TableColumn>
        </TableHeader>
        <TableBody
          // isLoading={isValidating}
          emptyContent={<Spinner />}
        >
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
      </Table> */}
    </div>
  );
}
