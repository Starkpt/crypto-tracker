"use client";

import {
  Radio,
  RadioGroup,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { NavigationBar } from "./components/NavigationBar";

const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

type ICoin = {
  id: string;
  symbol: string;
  name: string;
};

type ICoins = ICoin[];
type ICoinsByPage = ICoins[];

type ITrendingCoin = {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: number;
      price_btc: string;
      price_change_percentage_24h: {
        aed: number;
        ars: number;
        aud: number;
        bch: number;
        bdt: number;
        bhd: number;
        bmd: number;
        bnb: number;
        brl: number;
        btc: number;
        cad: number;
        chf: number;
        clp: number;
        cny: number;
        czk: number;
        dkk: number;
        dot: number;
        eos: number;
        eth: number;
        eur: number;
        gbp: number;
        gel: number;
        hkd: number;
        huf: number;
        idr: number;
        ils: number;
        inr: number;
        jpy: number;
        krw: number;
        kwd: number;
        lkr: number;
        ltc: number;
        mmk: number;
        mxn: number;
        myr: number;
        ngn: number;
        nok: number;
        nzd: number;
        php: number;
        pkr: number;
        pln: number;
        rub: number;
        sar: number;
        sek: number;
        sgd: number;
        thb: number;
        try: number;
        twd: number;
        uah: number;
        usd: number;
        vef: number;
        vnd: number;
        xag: number;
        xau: number;
        xdr: number;
        xlm: number;
        xrp: number;
        yfi: number;
        zar: number;
        bits: number;
        link: number;
        sats: number;
      };
      market_cap: string;
      market_cap_btc: string;
      total_volume: string;
      total_volume_btc: string;
      sparkline: string;
      content: {
        title: string;
        description: string;
      };
    };
  };
};

type ICurrency = "$" | "€";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [selectedColor, setSelectedColor] = useState("default");

  const [currency, setCurrency] = useState<ICurrency>("€");

  // const [coins, setCoins] = useState<ICoins>([]);
  // const [coinsByPage, setCoinsByPage] = useState<ICoinsByPage>([]);
  // const [trendingCoins, setTrendingCoins] = useState<ITrendingCoin[]>([]);
  // const [trendingCoinsByPage, setTrendingCoinsByPage] = useState<ITrendingCoin[][]>([]);
  const [marketCoins, setMarketCoins] = useState([]);

  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [page, setPage] = React.useState(1);

  const { data, error, isLoading, isValidating } = useSWR<any[]>("/api/markets", fetcher, {
    refreshInterval: 60000,
  });

  useEffect(() => {
    console.table(data);
    setMarketCoins(data);
  }, [data]);

  return (
    <>
      <NavigationBar />

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col gap-3">
          <Table
            color={selectedColor}
            selectionMode="single"
            defaultSelectedKeys={["2"]}
            aria-label="Example static collection table"
            // bottomContent={
            //   pages > 0 ? (
            //     <div className="flex w-full justify-center">
            //       <Pagination
            //         isCompact
            //         showControls
            //         showShadow
            //         color="primary"
            //         page={page}
            //         total={pages}
            //         onChange={(page) => setPage(page)}
            //       />
            //     </div>
            //   ) : null
            // }
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>COIN</TableColumn>
              <TableColumn>CURRENT PRICE</TableColumn>
            </TableHeader>
            <TableBody loadingContent={isLoading ?? <Spinner />}>
              {/* {trendingCoinsByPage[page - 1]?.map((coin: ITrendingCoin, id: number) => (
                <TableRow key={id}>
                  <TableCell>{coin.item.id}</TableCell>
                  <TableCell>{coin.item.name}</TableCell>
                  <TableCell>{coin.item.symbol}</TableCell>
                  <TableCell>
                    {currency} {coin.item.data.price}
                  </TableCell>
                </TableRow>
              ))} */}
              {marketCoins?.map((coin: any, id: number) => (
                <TableRow key={id}>
                  <TableCell>{coin.market_cap_rank}</TableCell>
                  <TableCell className="flex gap-2">
                    <Image src={coin.image} alt={coin.name} width={25} height={25} />
                    <p className="font-medium">{coin.name}</p>
                    <p className="text-metal uppercase">{coin.symbol}</p>
                  </TableCell>
                  <TableCell>
                    {currency} {coin.current_price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RadioGroup
            label="Selection color"
            orientation="horizontal"
            value={selectedColor}
            onValueChange={setSelectedColor}
          >
            {colors.map((color) => (
              <Radio key={color} color={color} value={color} className="capitalize">
                {color}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </main>
    </>
  );
}
