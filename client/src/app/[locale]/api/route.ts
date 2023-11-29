export const dynamic = "force-dynamic"; // defaults to force-static
import { ipcaData } from './ipcaData.js';

export async function GET(request: Request) {
  const res = new Response(JSON.stringify({}), {
    headers: { "content-type": "application/json" },
  });

  let data = await fetch(
    "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR",
  );
  data = await data.json();

  return {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ipcaData),
  };
}
