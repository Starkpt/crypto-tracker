import { NextRequest } from "next/server";

const options = { method: "GET", headers: { accept: "application/json" } };

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const marketsRes = await fetch(
    `${process.env.GECKO_API_URL_MARKETS}?vs_currency=eur&sparkline=true`,
    options
  );
  const marketsData = await marketsRes.json();

  const searchRes = await fetch(`${process.env.GECKO_API_URL_SEARCH}?${searchParams}`, options);
  const data = await searchRes.json();

  return Response.json({ data, marketsData });
}
