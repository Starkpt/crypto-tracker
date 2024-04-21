import { NextRequest } from "next/server";

const options = { method: "GET", headers: { accept: "application/json" } };

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const res = await fetch(`${process.env.GECKO_API_URL_MARKETS}?${searchParams}`, options);

  const data = await res.json();

  return Response.json(data);
}
