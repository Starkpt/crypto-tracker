"use client";

import { useState } from "react";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { selectableCurrencies as currencies } from "../utils/selectableCurrencies";

import { INavigationBar } from "../types/types";

const menuItems = ["Trending", "Search"];

export default function NavigationBar({
  selectedCurrency,
  setSelectedCurrency,
}: INavigationBar) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectCurrency = (e: any) => {
    // const selectCurrency = (e: ChangeEvent<HTMLInputElement>) => {
    const currencyItem = currencies.find(
      (currency) => currency.value === e.target.value
    );

    setSelectedCurrency(currencyItem);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <span className="bg-purple pt-1 pb-2 px-1.5 rounded">CRYPTO</span>{" "}
            TRACKER
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" color="foreground">
            Trending
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/search" color="foreground">
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:flex w-32" justify="center">
        <NavbarItem className="w-full">
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

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
