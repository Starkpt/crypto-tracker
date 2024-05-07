import { NextRequest } from "next/server";

// Define options for fetch requests
const options = { method: "GET", headers: { accept: "application/json" } };

// Handler function for GET requests
export async function GET(request: NextRequest) {
  // Extract search parameters from the request URL
  const { searchParams }: { searchParams: URLSearchParams } = request.nextUrl;

  // Create an object to store search parameters for markets API
  const paramsForMarkets: Record<string, string | number> = {};

  // Create an object to store search parameters for search API
  const paramsForCoinSearch: Record<string, string | number> = {};

  // Iterate through each parameter in the searchParams
  searchParams.forEach((value: string | number, key: string) => {
    // Include only the 'query' parameter in paramsForCoinSearch if it exists
    if (key === "query" && value) paramsForCoinSearch[key] = value;
    // Exclude the 'query' parameter from paramsForMarkets
    if (key !== "query") paramsForMarkets[key] = value;
  });

  // Create URLSearchParams objects for markets and search parameters
  const URLMarketsSearchParams = new URLSearchParams(paramsForMarkets);
  const URLCoinsSearchParams = new URLSearchParams(paramsForCoinSearch);

  // Fetch data from the markets API using modified search parameters
  const marketsRes = await fetch(
    `${process.env.GECKO_API_URL_MARKETS}?${URLMarketsSearchParams}`,
    options
  );

  // Fetch data from the search API using modified search parameters
  const searchRes = await fetch(
    `${process.env.GECKO_API_URL_SEARCH}?${URLCoinsSearchParams}`,
    options
  );

  // Parse JSON responses from both APIs
  const markets = await marketsRes.json();
  const coinsSearch = await searchRes.json();

  // Return a JSON response containing data from both APIs
  return Response.json({ coinsSearch, markets });
}
