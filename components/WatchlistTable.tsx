"use client";

import React from "react";
import Link from "next/link";
import WatchlistButton from "./WatchlistButton";

interface WatchlistTableProps {
  stocks: Array<{
    symbol: string;
    name?: string;
    price?: number;
    change?: number;
    changePercent?: number;
    marketCap?: number;
    peRatio?: number;
    error?: boolean;
  }>;
}

const WatchlistTable: React.FC<WatchlistTableProps> = ({ stocks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-800 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Company</th>
            <th scope="col" className="px-6 py-3">Symbol</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Change</th>
            <th scope="col" className="px-6 py-3">Market Cap</th>
            <th scope="col" className="px-6 py-3">P/E Ratio</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol} className="border-b bg-gray-900 border-gray-700 hover:bg-gray-800">
              <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                {stock.error ? (
                  <span className="text-red-400">Error loading {stock.symbol}</span>
                ) : (
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {stock.name || stock.symbol}
                  </Link>
                )}
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/stocks/${stock.symbol}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {stock.symbol}
                </Link>
              </td>
              <td className="px-6 py-4">
                {stock.error ? (
                  <span className="text-gray-500">N/A</span>
                ) : (
                  `$${stock.price?.toFixed(2) || 'N/A'}`
                )}
              </td>
              <td className="px-6 py-4">
                {stock.error ? (
                  <span className="text-gray-500">N/A</span>
                ) : (
                  <span className={stock.changePercent && stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {stock.changePercent ? `${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%` : 'N/A'}
                    {stock.change ? ` (${stock.change >= 0 ? '+' : ''}$${stock.change.toFixed(2)})` : ''}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                {stock.error ? (
                  <span className="text-gray-500">N/A</span>
                ) : (
                  stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(2)}B` : 'N/A'
                )}
              </td>
              <td className="px-6 py-4">
                {stock.error ? (
                  <span className="text-gray-500">N/A</span>
                ) : (
                  stock.peRatio ? stock.peRatio.toFixed(2) : 'N/A'
                )}
              </td>
              <td className="px-6 py-4">
                <WatchlistButton
                  symbol={stock.symbol}
                  company={stock.name || stock.symbol}
                  isInWatchlist={true}
                  showTrashIcon={true}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchlistTable;
