"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import { INavigationBar } from "../types/types";

import { selectableCurrencies as currencies } from "../utils/selectableCurrencies";

export default function NavigationBar({ selectedCurrency, setSelectedCurrency }: INavigationBar) {
  const selectCurrency = (e: any) => {
    // const selectCurrency = (e: ChangeEvent<HTMLInputElement>) => {
    const currencyItem = currencies.find((currency) => currency.value === e.target.value);

    setSelectedCurrency(currencyItem);
  };

  return (
    <Navbar maxWidth="full" className="lg:px-28">
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">
            CRYPTO <span className="bg-purple pt-1 pb-2 px-1.5 rounded">TRACKER</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <select
            className="rounded p-0.5 pb-1"
            name="currency"
            id="currency"
            onChange={selectCurrency}
            defaultValue={selectedCurrency.value}
          >
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.value}>
                {currency.symbol} {currency.name}
              </option>
            ))}
          </select>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
