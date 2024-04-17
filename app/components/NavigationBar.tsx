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

const menuItems = ["Trending", "Search"];

export type ICurrencyItem = {
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

export const NavigationBar = (selectedCurrency, setSelectedCurrency) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            onChange={(e) => {
              console.log(e);
            }}
          >
            <option onSelect={(e) => console.log(e)} value="eur">
              € Euro
            </option>
            <option value="usd">$ Dollar</option>
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
};
