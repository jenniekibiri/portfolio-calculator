import * as moment from "moment";
import { getExchangeRate } from "./get-exchange-rates";
import { transaction } from "./types";
import { calculatePortfolio } from "./helper";

//Given a token, return the latest portfolio value in USD
export async function getLatestPortfolioValueByToken(
  token: string,
  transactions: Array<transaction>
): Promise<number> {
  // Get the amount of the specified token in the portfolio
  let portfolio: Map<string, number> = new Map();
  portfolio = calculatePortfolio(portfolio, transactions, token);
  let value = portfolio.get(token) || 0;

  // Get the latest exchange rate for the specified token
  let date = new Date();
  let formattedDate = moment(date).format("YYYY-MM-DD");
  let amount = await getExchangeRate(token, formattedDate);
  return value * amount;
}
