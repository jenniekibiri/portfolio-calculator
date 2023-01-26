import { transaction } from "./types";

import { calculatePortfolio, getExchangeRateForToken } from "./helper";

// Given a token and a date, return the portfolio value in USD
export async function getPortfolioValueByDateAndToken(
  date: Date,
  token: string,
  transactions: Array<transaction>
): Promise<Map<string, number>> {
  let portfolio: Map<string, number> = new Map();

  // Get the amount of each token in the portfolio
  portfolio = calculatePortfolio(portfolio, transactions, token);

  // Get the latest exchange rate for each token
  portfolio = await getExchangeRateForToken(portfolio, date);

  return portfolio;
}
