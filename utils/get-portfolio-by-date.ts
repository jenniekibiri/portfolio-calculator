import { transaction } from "./types";
import {
  calculatePortfolioForAllTokens,
  getExchangeRateForToken,
} from "./helper";

// Given Date return the portfolio value  per token in USD
export async function getPortfolioValueByDate(
  date: Date,
  transactions: Array<transaction>
): Promise<Map<string, number>> {
  let portfolio: Map<string, number> = new Map();

  //Get the amount of each token in the portfolio
  portfolio = calculatePortfolioForAllTokens(portfolio, transactions);

  // Get the latest exchange rate for each token
  portfolio = await getExchangeRateForToken(portfolio, date);

  return portfolio;
}
