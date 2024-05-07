// REACT
import { useMemo, useState } from "react";

// LIBRARIES
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
import { PressEvent, usePress } from "@react-aria/interactions";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import _ from "lodash";
import Image from "next/image";
import { Line } from "react-chartjs-2";

// HOOKS
import useSearchCoins from "@/app/hooks/useSearchCoins";

// UTILS
import { attributeHoursToChartData } from "@/app/utils/attributeHoursToChartData";
import { toggleTrackedCoin } from "@/app/utils/toggleTrackedCoin";

// TYPES
import { ICoinSearch, ICurrency, IMarketCoin } from "@/app/types/types";

// RESOURCES
import { SearchIcon } from "@/public/SearchIcon";
import starFilled from "@/public/star-filled.svg";
import starOutlined from "@/public/star-outlined.svg";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartOptions = {
  maintainAspectRatio: false,
  scales: { x: { display: false, beginAtZero: false }, y: { display: false } },
  plugins: { title: { display: false }, legend: { display: false } },
};

export default function SearchCoins({
  selectedCurrency,
  setTrackedCoins,
  trackedCoins,
  data,
}: {
  selectedCurrency: ICurrency;
  setTrackedCoins: any;
  trackedCoins: { id: string }[];
  data: IMarketCoin[];
}) {
  const [page, setPage] = useState<number>(1);
  const [coinsListIndex, setCoinsListIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  let { pressProps } = usePress({
    onPress: (e: PressEvent) => toggleTrackedCoin(e, setTrackedCoins),
  });

  const { data: searchedCoins, isLoading } = useSearchCoins({
    selectedCurrency,
    searchValue: useMemo(() => searchValue, [searchValue]),
    trackedCoins: useMemo(() => trackedCoins, [trackedCoins]),
  });

  // Handlers
  const handleSelectPage = (page: number) => {
    setPage(page);
    setCoinsListIndex(page - 1);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSelectPage(1);
  };

  const debouncedOnChange = useMemo(() => _.debounce(handleOnChange, 1800), []);

  const coins: ICoinSearch[][] = useMemo(() => {
    if (!searchValue) {
      return _.chunk(data, 10);
    } else {
      return searchedCoins;
    }
  }, [data, searchValue, searchedCoins]);

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
                total={searchedCoins?.length}
                onChange={handleSelectPage}
              />
            </div>
          }
          classNames={{ wrapper: "min-h-[222px] rounded-small" }}
        >
          <TableHeader>
            <TableColumn key="track"> </TableColumn>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="price">PRICE</TableColumn>
            <TableColumn key="change24h">PRICE CHANGE 24h</TableColumn>
            <TableColumn key="chart">CHART</TableColumn>
          </TableHeader>
          <TableBody emptyContent={<Spinner />} isLoading={isLoading}>
            {coins?.[coinsListIndex]?.map((coin) => (
              <TableRow key={coin.name}>
                <TableCell width={20} className="p-1">
                  {/* @ts-ignore-next-line */}
                  <Button
                    id={coin.id}
                    isIconOnly
                    size="sm"
                    className="flex bg-transparent hover:bg-purple rounded-sm"
                    {...pressProps}
                  >
                    <Image
                      src={coin?.isTracked ? starFilled : starOutlined}
                      alt={coin?.isTracked ? "Tracked" : "Untracked"}
                      width={25}
                      height={25}
                    />
                  </Button>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={25}
                    height={25}
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="font-medium">{coin.name}</p>
                  <p className="text-metal uppercase">{coin.symbol}</p>
                </TableCell>
                <TableCell className="text-right">
                  {selectedCurrency.symbol} {coin.current_price}
                </TableCell>
                <TableCell className="text-right">
                  {selectedCurrency.symbol} {coin.price_change_24h.toFixed(6)}
                </TableCell>
                <TableCell className="max-w-28 lg:max-w-48">
                  <Line
                    height={20}
                    options={chartOptions}
                    data={{
                      datasets: [
                        {
                          data: attributeHoursToChartData(coin?.sparkline_in_7d?.price || []),
                          borderColor: "#3f3cbb",
                        },
                      ],
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
