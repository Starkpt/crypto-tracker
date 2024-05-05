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
import { handleTrackedCoin } from "@/app/utils/handleTrackedCoins";

// TYPES
import { ICoinSearch, ICurrency, IMarketCoin, ISearchedCoins } from "@/app/types/types";

// RESOURCES
import starFilled from "@/public/star-filled.svg";
import starOutlined from "@/public/star-outlined.svg";
import { SearchIcon } from "@/public/SearchIcon";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function attributeHourMarksToValues(values: (number | string)[]) {
  // Initialize an array to store the attributed hour marks
  const attributedValues = [];

  // Start from the last index and decrement by 1 for each value
  let currentHour = new Date();

  for (let i = values.length - 1; i >= 0; i--) {
    // Format the current hour mark
    const formattedTime = new Intl.DateTimeFormat(navigator.language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .format(currentHour)
      .replace(/,\\s?/g, "-")
      .replace(",", "");

    // Assign the current hour mark and value to the current entry
    attributedValues[i] = {
      x: formattedTime,
      y: values[i],
    };

    // Decrement the hour mark by 1
    currentHour = new Date(currentHour.getTime() - 60 * 60 * 1000);
  }

  // Return the array of attributed values
  return attributedValues;
}

const chartOptions = {
  maintainAspectRatio: false,
  scales: { x: { display: false, beginAtZero: false }, y: { display: false } },
  plugins: { title: { display: false }, legend: { display: false } },
};

export default function SearchCoins({
  selectedCurrency,
  setTrackedCoins,
  data,
}: {
  selectedCurrency: ICurrency;
  setTrackedCoins: any;
  data: IMarketCoin[];
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

  const handleSelectPage = (page: number) => {
    setPage(page);
    setCoinsListIndex(page - 1);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSelectPage(1);
  };

  const debouncedOnChange = useMemo(() => _.debounce(handleOnChange, 1800), []);

  const trackedCoins = localStorage.getItem("trackedCoins");

  const coinSearchList: ICoinSearch[][] = useMemo(() => {
    const ITEMS_PER_PAGE = 10;
    const trackedCoinsJSON = trackedCoins ? JSON.parse(trackedCoins) : [];

    if (!data) return [];

    let filteredList: ICoinSearch[] = data;

    if (searchedCoins?.length) {
      filteredList = data.filter((coin: IMarketCoin) =>
        searchedCoins.some((searchedCoin: ISearchedCoins) => searchedCoin.id === coin.id)
      );
    }

    filteredList = data.map((coin: IMarketCoin) => ({
      isTracked: trackedCoinsJSON.some((item: { id: string }) => item.id === coin.id),
      ...coin,
    }));

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
          classNames={{ wrapper: "min-h-[222px] rounded-small" }}
        >
          <TableHeader>
            <TableColumn key="track"> </TableColumn>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="price">PRICE</TableColumn>
            <TableColumn key="change24h">PRICE CHANGE 24h</TableColumn>
            <TableColumn key="chart">CHART</TableColumn>
          </TableHeader>
          <TableBody emptyContent={<Spinner />}>
            {coinSearchList?.[coinsListIndex]?.map((coin) => (
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
                      src={coin.isTracked ? starFilled : starOutlined}
                      alt={coin.isTracked ? "Tracked" : "Untracked"}
                      width={25}
                      height={25}
                    />
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
                <TableCell>
                  {selectedCurrency.symbol} {coin.price_change_24h}
                </TableCell>
                <TableCell className="max-w-28 lg:max-w-48">
                  <Line
                    height={20}
                    options={chartOptions}
                    data={{
                      datasets: [
                        {
                          data: attributeHourMarksToValues(coin?.sparkline_in_7d?.price || []),
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
