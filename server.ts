import * as fs from "fs";
import * as csv from "csv-parser";
import { program } from "commander";
import * as moment from "moment";
import { getExchangeRate } from "./utils/get-exchange-rates";
import { transaction } from "./utils/types";
import { getPortfolioValueByDateAndToken } from "./utils/get-portfolio-by-token-date";
import { getPortfolioValueByDate } from "./utils/get-portfolio-by-date";
import { getLatestPortfolioValueByToken } from "./utils/get-portfolio-by-token";
import { getLatestPortfolioValue } from "./utils/get-latest-value";

let transactions: Array<transaction> = [];

// Read the CSV file and parse the data
fs.createReadStream("transactions.csv")
  .pipe(csv())
  .on("data", (data: transaction) => {
    transactions.push(data);
  })
  .on("end", async () => {
    console.log("CSV file successfully processed");
    //command line interface
    program.version("0.0.1");
    program
      .version("0.1.0")
      .option("-t, --token <token>", "Token symbol")
      .option("-d, --date <date>", "Date in the format YYYY-MM-DD")
      .parse(process.argv);

    let command = program.opts();
    // Args: -t BTC -d 2021-01-01
    if (command.token && command.date) {
      let portfolioValueByDateAndToken = await getPortfolioValueByDateAndToken(
        new Date(command.date),
        command.token,
        transactions
      );
      console.log(
        `Portfolio value for ${command.token} and ${command.date} in USD:`,
        portfolioValueByDateAndToken
      );
      // Args: -t BTC
    } else if (command.token) {
      let portfolioValue = await getLatestPortfolioValueByToken(
        command.token,
        transactions
      );
      console.log(
        `Portfolio value for ${command.token} in USD:`,
        portfolioValue
      );
      // Args: -d 2021-01-01
    } else if (command.date) {
      let portfolioValueByDate = await getPortfolioValueByDate(
        new Date(command.date),
        transactions
      );
      console.log(
        `Portfolio value for ${command.date} in USD:`,
        portfolioValueByDate
      );
      // No args
    } else {
      console.log("No options provided");
      let portfolio = await getLatestPortfolioValue(transactions);
      console.log("Portfolio value per token in USD: ", portfolio);
    }
  });
