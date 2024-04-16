import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const options = { method: "GET", headers: { accept: "application/json" } };

  let data = await fetch("https://api.coingecko.com/api/v3/search/trending", options).then((res) =>
    res.json()
  );

  return NextResponse.json(data);
}
