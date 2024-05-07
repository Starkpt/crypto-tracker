export type ICurrency = {
  id: number;
  value: string;
  name: string;
  symbol: string;
};

export type ITrackedCoin = { id: string };

// COMPONENTS TYPES
export type INavigationBar = {
  selectedCurrency: ICurrency;
  setSelectedCurrency: (value: ICurrency) => void;
};

// API TYPES
export type IAPIFetcher = (url: string, options?: RequestInit) => Promise<any>;

// DATA TYPES
export type IMarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: 3.59479;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
  sparkline_in_7d?: {
    price: number[] | string[];
  };
};

export interface ICoinSearch extends IMarketCoin {
  isTracked?: boolean;
}

export type ISearchedCoins = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export type ISearchCryptos = {
  categories: any[];
  coins: ISearchedCoins[];
  exchanges: any[];
  icos: any[];
  nfts: any[];
};
