export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(request: Request) {
  // req.add("path", "ETH,USD");

  const res = new Response(JSON.stringify({}), {
    headers: { "content-type": "application/json" },
  });

  let data = await fetch(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR",
  );
  data = await data.json();

  return Response.json(data);
}
