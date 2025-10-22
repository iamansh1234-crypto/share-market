import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getStockData } from "@/lib/actions/stock.actions";
import WatchlistTable from "@/components/WatchlistTable";

export default async function WatchlistPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const symbols = await getWatchlistSymbolsByEmail(session.user.email);

  if (symbols.length === 0) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Your watchlist is empty</p>
            <p className="text-gray-500">Start adding stocks to track your favorite companies</p>
          </div>
        </div>
      </div>
    );
  }

  const stockData = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const data = await getStockData(symbol);
        return { symbol, ...data };
      } catch (error) {
        console.error(`Failed to fetch data for ${symbol}:`, error);
        return { symbol, error: true };
      }
    })
  );

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>
        <WatchlistTable stocks={stockData} />
      </div>
    </div>
  );
}
