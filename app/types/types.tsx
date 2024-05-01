export type ICoin = {
  id: string;
  symbol: string;
  name: string;
};

export type ICoins = ICoin[];
export type ICoinsByPage = ICoins[];

export type ICurrencySymbol = "$" | "€" | string;

export type ICurrency = {
  id: number;
  value: string;
  name: string;
  symbol: ICurrencySymbol | string;
};

export type INavigationBar = {
  selectedCurrency: ICurrency;
  setSelectedCurrency: any;
};

export type ITrendingCoin = {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: number;
      price_btc: string;
      price_change_percentage_24h: {
        aed: number;
        ars: number;
        aud: number;
        bch: number;
        bdt: number;
        bhd: number;
        bmd: number;
        bnb: number;
        brl: number;
        btc: number;
        cad: number;
        chf: number;
        clp: number;
        cny: number;
        czk: number;
        dkk: number;
        dot: number;
        eos: number;
        eth: number;
        eur: number;
        gbp: number;
        gel: number;
        hkd: number;
        huf: number;
        idr: number;
        ils: number;
        inr: number;
        jpy: number;
        krw: number;
        kwd: number;
        lkr: number;
        ltc: number;
        mmk: number;
        mxn: number;
        myr: number;
        ngn: number;
        nok: number;
        nzd: number;
        php: number;
        pkr: number;
        pln: number;
        rub: number;
        sar: number;
        sek: number;
        sgd: number;
        thb: number;
        try: number;
        twd: number;
        uah: number;
        usd: number;
        vef: number;
        vnd: number;
        xag: number;
        xau: number;
        xdr: number;
        xlm: number;
        xrp: number;
        yfi: number;
        zar: number;
        bits: number;
        link: number;
        sats: number;
      };
      market_cap: string;
      market_cap_btc: string;
      total_volume: string;
      total_volume_btc: string;
      sparkline: string;
      content: {
        title: string;
        description: string;
      };
    };
  };
};

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

export type ITopCoin = {
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
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: undefined | null;
  last_updated: string;
};
