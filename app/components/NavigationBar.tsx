"use client";

// LIBRARIES
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

// TYPES
import { INavigationBar } from "@/app/types/types";

// UTILS
import { selectableCurrencies } from "@/app/utils/selectableCurrencies";

export default function NavigationBar({ selectedCurrency, setSelectedCurrency }: INavigationBar) {
  const selectCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const currencyItem = selectableCurrencies.find((currency) => currency.value === selectedValue);

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
            value={selectedCurrency.value}
          >
            {selectableCurrencies.map((currency) => (
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
