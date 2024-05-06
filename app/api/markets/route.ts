import { NextRequest } from "next/server";

const options = { method: "GET", headers: { accept: "application/json" } };

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // // Create an empty object to store the converted data
  // const searchData = {};

  // // Loop through each parameter in the searchParams object and add it to the searchData object
  // for (const [key, value] of searchParams?.entries()) {
  //   searchData?.[key] = value;
  // }

  const res = await fetch(`${process.env.GECKO_API_URL_MARKETS}?${searchParams}`, options);

  const data = await res.json();

  return Response.json(data);
}
