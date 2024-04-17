"use client";

import InifiniTable from "./components/InfiniTable";
import { NavigationBar } from "./components/NavigationBar";
import { TrendingCoins } from "./components/Trending";

export default function Home() {
  return (
    <>
      <NavigationBar />

      <main className="flex min-h-screen flex-col justify-between p-24">
        <div className="flex flex-row gap-3">
          <TrendingCoins />
          <InifiniTable />
        </div>
      </main>
    </>
  );
}
