import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";
import React from "react";

type ICurrencyItem = {
  // id: number;
  value: string;
  label: string;
  symbol: string;
};

const currencies: ICurrencyItem[] = [
  {
    // id: 0,
    value: "usd",
    label: "Dollar",
    symbol: "$",
  },
  {
    // id: 1,
    value: "eur",
    label: "Euro",
    symbol: "€",
  },
];

const menuItems = ["Trending", "Search"];

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [selectedCurrency, setSelectedCurrency] = React.useState<Selection>(new Set(["eur"]));

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <span className="bg-purple pt-1 pb-2 px-1.5 rounded">CRYPTO</span> TRACKER
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
          <Select
            aria-label="currency"
            aria-labelledby="currency"
            items={currencies}
            className="w-full"
            selectedKeys={selectedCurrency}
            onSelectionChange={setSelectedCurrency}
          >
            {(item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                title={`${item.symbol} ${item.label}`}
              />
            )}
          </Select>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
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
};
