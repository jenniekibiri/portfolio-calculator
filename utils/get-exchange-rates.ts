import * as request from "request";

// Function to get the exchange rate of a token in USD
export function getExchangeRate(token: string, date: string): Promise<number> {
  let formatedTime = new Date(date);
  const timestamp = Math.round(formatedTime.getTime() / 1000);
  return new Promise((resolve, reject) => {
    request(
      `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD&ts=${timestamp}`,
      (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          let exchangeRate = JSON.parse(body).USD;
          resolve(exchangeRate);
        }
      }
    );
  });
}
