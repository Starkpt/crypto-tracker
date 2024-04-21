const options = { method: "GET", headers: { accept: "application/json" } };

export async function GET() {
  const res = await fetch(`${process.env.GECKO_API_URL_TRENDING}`, options);

  const data = await res.json();

  return Response.json(data);
}
