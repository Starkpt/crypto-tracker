import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { ICurrency } from "../types/types";

type ISearchedCoins = {};

const params = { order: "market_cap_rank_desc", per_page: "5" };
const fetcherOptions = { refreshInterval: 60000 };

export default function SearchCoins({ selectedCurrency }: { selectedCurrency: ICurrency }) {
  const [searchedCoins, setSearchedCoins] = useState<any[]>([]);

  const searchParams = new URLSearchParams({
    vs_currency: selectedCurrency.value,
    ...params,
  }).toString();

  const { data, error, isLoading, isValidating } = useSWR<any[]>("/api/search", fetcher);

  useMemo(() => setSearchedCoins(data), [data]);

  console.log(data);

  // const [page, setPage] = React.useState(1);
  // const rowsPerPage = 4;

  // const pages = Math.ceil(searchedCoins?.length / rowsPerPage) || 1;

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return searchedCoins?.slice(start, end);
  // }, [page, searchedCoins]);

  return (
    <div>asd</div>
    // <Table
    //   aria-label="Example table with client side pagination"
    //   bottomContent={
    //     <div className="flex w-full justify-center">
    //       <Pagination
    //         isCompact
    //         showControls
    //         showShadow
    //         color="secondary"
    //         page={page}
    //         total={pages}
    //         onChange={(page) => setPage(page)}
    //       />
    //     </div>
    //   }
    //   classNames={{
    //     wrapper: "min-h-[222px]",
    //   }}
    // >
    //   <TableHeader>
    //     <TableColumn key="name">NAME</TableColumn>
    //     <TableColumn key="role">ROLE</TableColumn>
    //     <TableColumn key="status">STATUS</TableColumn>
    //   </TableHeader>
    //   <TableBody items={items}>
    //     <>
    //       {" "}
    //       <TableRow key={"name"}>
    //         <TableCell>this</TableCell>
    //       </TableRow>
    //       <TableRow key={"role"}>
    //         <TableCell>role</TableCell>
    //       </TableRow>
    //       <TableRow key={"status"}>
    //         <TableCell>offline</TableCell>
    //       </TableRow>
    //       {/* {(item) => (
    //         <TableRow key={item.name}>
    //           {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
    //         </TableRow>
    //       )} */}
    //     </>
    //   </TableBody>
    // </Table>
  );
}
