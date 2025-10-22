'use server';

import { fetchJSON } from './finhub.actions';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const NEXT_PUBLIC_FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? '';

export async function getStockData(symbol: string): Promise<{
  name?: string;
  price?: number;
  change?: number;
  changePercent?: number;
  marketCap?: number;
  peRatio?: number;
}> {
  try {
    const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!token) {
      throw new Error('FINNHUB API key is not configured');
    }

    const upperSymbol = symbol.toUpperCase();

    // Fetch quote data
    const quoteUrl = `${FINNHUB_BASE_URL}/quote?symbol=${encodeURIComponent(upperSymbol)}&token=${token}`;
    const quote = await fetchJSON<{
      c: number; // current price
      d: number; // change
      dp: number; // change percent
      h: number; // high
      l: number; // low
      o: number; // open
      pc: number; // previous close
    }>(quoteUrl, 60); // Cache for 1 minute

    // Fetch basic info
    const profileUrl = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(upperSymbol)}&token=${token}`;
    const profile = await fetchJSON<{
      name?: string;
      marketCapitalization?: number;
    }>(profileUrl, 3600); // Cache for 1 hour

    // Fetch metrics for P/E ratio
    const metricsUrl = `${FINNHUB_BASE_URL}/stock/metric?symbol=${encodeURIComponent(upperSymbol)}&metric=all&token=${token}`;
    const metrics = await fetchJSON<{
      metric?: {
        peNormalizedAnnual?: number;
      };
    }>(metricsUrl, 3600); // Cache for 1 hour

    return {
      name: profile.name,
      price: quote.c,
      change: quote.d,
      changePercent: quote.dp,
      marketCap: profile.marketCapitalization,
      peRatio: metrics.metric?.peNormalizedAnnual,
    };
  } catch (err) {
    console.error(`Error fetching stock data for ${symbol}:`, err);
    throw new Error(`Failed to fetch data for ${symbol}`);
  }
}
