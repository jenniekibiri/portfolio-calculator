"use strict";
exports.__esModule = true;
exports.getExchangeRate = void 0;
var request = require("request");
// Function to get the exchange rate of a token in USD
function getExchangeRate(token, date) {
    var formatedTime = new Date(date);
    var timestamp = Math.round(formatedTime.getTime() / 1000);
    return new Promise(function (resolve, reject) {
        request("https://min-api.cryptocompare.com/data/price?fsym=".concat(token, "&tsyms=USD&ts=").concat(timestamp), function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                var exchangeRate = JSON.parse(body).USD;
                resolve(exchangeRate);
            }
        });
    });
}
exports.getExchangeRate = getExchangeRate;
