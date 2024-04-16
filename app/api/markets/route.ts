// export const dynamic = "force-dynamic"; // defaults to auto

const baseURL = "https://api.coingecko.com/api/v3/coins/markets";

const options = {
  method: "GET",
  headers: { accept: "application/json" },
  next: { revalidate: 10 },
};

export async function GET() {
  const res = await fetch(
    `${baseURL}?vs_currency=eur&order=market_cap_rank_desc&per_page=5`,
    options
  );

  const data = await res.json();

  return Response.json(data);
}
