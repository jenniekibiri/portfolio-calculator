import { transaction } from "./types";
import { calculatePortfolioForAllTokens, getExchangeRateForToken } from "./helper";

// Given no parameters, return the latest portfolio value per token in USD
export async function getLatestPortfolioValue(
  transactions: Array<transaction>
): Promise<Map<string, number>> {
  let portfolio: Map<string, number> = new Map();

  // Get the amount of each token in the portfolio
  portfolio = calculatePortfolioForAllTokens(portfolio, transactions);
  // Get the latest exchange rate for each token
  portfolio = await getExchangeRateForToken(portfolio);

  return portfolio;
}


   