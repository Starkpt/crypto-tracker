// REACT
import { useMemo } from "react";

// LIBRARIES
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { PressEvent, usePress } from "@react-aria/interactions";
import Image from "next/image";

// UTILS
import { toogleTrackedCoin } from "@/app/utils/toogleTrackedCoin";

// TYPES
import { ICurrency, IMarketCoin } from "@/app/types/types";

// RESOURCES
import star from "@/public/star-filled.svg";

export default function TrackedCoins({
  data,
  selectedCurrency,
  setTrackedCoins,
  trackedCoins,
}: {
  data: IMarketCoin[] | any;
  selectedCurrency: ICurrency;
  setTrackedCoins: any;
  trackedCoins: { id: string }[];
}) {
  const coins = useMemo(() => {
    return trackedCoins.map((coin) =>
      data?.find((dataCoin: IMarketCoin) => dataCoin.id === coin.id)
    );
  }, [data, trackedCoins]);

  let { pressProps } = usePress({
    onPress: (e: PressEvent) => toogleTrackedCoin(e, setTrackedCoins),
  });

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-xl h-10">Tracked Coins</h3>

      <Table
        classNames={{
          wrapper: "rounded-small",
        }}
        fullWidth
        aria-label="Top 5 crypto currencies"
      >
        <TableHeader>
          <TableColumn width={20}> </TableColumn>
          <TableColumn>Coin</TableColumn>
          <TableColumn>Price</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={!coins ?? <Spinner />}
          emptyContent={
            <TableRow>
              <TableCell>No coin being tracked</TableCell>
            </TableRow>
          }
        >
          {coins?.map((coin: any, id: number) => (
            <TableRow key={id}>
              <TableCell width={20} className="p-1">
                {/* @ts-ignore */}
                <Button
                  id={coin?.id}
                  isIconOnly
                  size="sm"
                  className="flex bg-transparent hover:bg-purple rounded-sm"
                  {...pressProps}
                >
                  <Image src={star} alt="Untrack" width={25} height={25} />
                </Button>
              </TableCell>
              <TableCell>{coin?.id}</TableCell>
              <TableCell>
                {selectedCurrency.symbol} {coin?.current_price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
