import * as moment from "moment";
import { transaction } from "./types";
import { getExchangeRate } from "./get-exchange-rates";

// Get the amount of each token in the portfolio
export function calculatePortfolio(
  portfolio: Map<string, number>,
  transactions: Array<transaction>,
  token: string
) {
  for (const transaction of transactions) {
    if (transaction.token === "") {
      continue;
    }
    if (transaction.token === token) {
      let currentValue: number = portfolio.get(transaction.token) || 0;
      if (transaction.transaction_type === "DEPOSIT") {
        currentValue = Number(currentValue) + Number(transaction.amount);
      } else if (transaction.transaction_type === "WITHDRAWAL") {
        currentValue = Number(currentValue) - Number(transaction.amount);
      }
      portfolio.set(transaction.token, currentValue);
    }
  }
  return portfolio;
}
// Get the latest exchange rate for each token
export async function getExchangeRateForToken(
  portfolio: Map<string, number>,
  date?: Date
) {
  for (const [token, value] of Array.from(portfolio.entries())) {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    let exchangeRate: number = await getExchangeRate(token, formattedDate);
    if (!exchangeRate) {
      continue;
    }
    portfolio.set(token, value * exchangeRate);
  }
  return portfolio;
}

// Get the amount of all tokens in the portfolio
export function calculatePortfolioForAllTokens(
  portfolio: Map<string, number>,
  transactions: Array<transaction>
) {
  for (const transaction of transactions) {
    if (transaction.token === "") {
      continue;
    }
    let currentValue: number = portfolio.get(transaction.token) || 0;
    if (transaction.transaction_type === "DEPOSIT") {
      currentValue = Number(currentValue) + Number(transaction.amount);
    } else if (transaction.transaction_type === "WITHDRAWAL") {
      currentValue = Number(currentValue) - Number(transaction.amount);
    }
    portfolio.set(transaction.token, currentValue);
  }
  return portfolio;
}
