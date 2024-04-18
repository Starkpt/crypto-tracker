// export const dynamic = "force-dynamic"; // defaults to auto

const baseURL = "https://api.coingecko.com/api/v3/coins/markets";

const options = {
  method: "GET",
  headers: { accept: "application/json" },
  next: { revalidate: 10 },
};

export async function GET(request: Request) {
  const searchParams = request.url.search;

  const res = await fetch(`${baseURL}?${searchParams}`, options);

  const data = await res.json();

  console.log({ res, data });

  return Response.json(data);
}
