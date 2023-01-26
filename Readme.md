## Technical Assessment

## Problem Statement

In this technical assessment, I was tasked with creating a function that returns the following:

- Given no parameters, return the latest portfolio value per token in USD
- Given a date and a token, return the portfolio value of that token in USD on that date
- Given a date, return the portfolio value per token in USD on that date

# Technical Choices

- I used Nodejs/Typescript to get the job done. I used Typescript because it's a superset of Javascript, and it's a strongly-typed language.
- To parse the CSV file, I used the "csv-parser" library. This library allows for easy parsing of CSV files, and it's a well-maintained library.
- To obtain the exchange rate, I used the CryptoCompare API as instructed.
- To track the portfolio value, I used a Map data structure. This data structure allows for easy insertion, retrieval, and deletion of key-value pairs. It's also easy to iterate over the keys and values of a Map.
- I also added error handling mechanism in the main function that is calling the getExchangeRate function.
- I added options in the main file.

# How to run the code

- Clone the repository
- Run `npm install` to install the dependencies
- Run `tsc server.ts` to compile the Typescript code
- Run `npm run start  ` for no parameters
- Run `npm run start -t <token> ` for a token
- Run `npm run start -d <date> ` for a date
- Run `npm run start -t <token> -d <date> ` for a token and a date

🍻 Cheers!
