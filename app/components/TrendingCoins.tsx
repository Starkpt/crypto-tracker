// LIBRARIES
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

// HOOKS
import useFetchMarkets from "@/app/hooks/useFetchMarkets";

// TYPES
import { ICoinSearch, ICurrency } from "@/app/types/types";

export default function TrendingCoins({ selectedCurrency }: { selectedCurrency: ICurrency }) {
  const { data, isValidating } = useFetchMarkets({
    selectedCurrency,
    queryParams: { order: "market_cap_rank_desc", per_page: "5" },
  });

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-xl h-10">Trending</h3>
      <Table
        classNames={{ wrapper: "rounded-small" }}
        fullWidtharia-label="Top 5 crypto currencies"
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>COIN</TableColumn>
          <TableColumn>CURRENT PRICE</TableColumn>
        </TableHeader>
        <TableBody isLoading={isValidating} emptyContent={<Spinner />}>
          {data ? (
            data?.map((coin: ICoinSearch, id: number) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell>No coin</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
