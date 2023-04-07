var stockEl = document.getElementById("stockL")
var searchBtnEl = document.getElementById("searchbtn");
var txtBoxEl = document.getElementById("usrinpt");
var stockHistEl = document.getElementById("stockHistL")
var requestURL = 'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-03-31?adjusted=true&apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var stockList;
var result;
var stocks = [];
var defaultStocks = ["NOW", "GOOG", "AMZN", "DIS", "PANW", "BA", "PLD", "JNJ"];


if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition);
 }
 function setPosition(position){
     let latitude = position.coords.coords.latitude;
     let longitude = position.coords.longitude;
     getWeather(latitude, longitude);
 }

function getApi(url, search) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            stockList = data.results;
            filterApi(stockList, search);
        })
};

function filterApi(stockList, search) {
    result = stockList.find(s => s.T === search);
    stocks.push(result.T + ", close: " + result.c + ", high: " + result.h + ", low: " + result.l + ", transactions: " + result.n);
    renderStocks(result)
};

function renderStocks(result) {
    stockEl.innerHTML = "";
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];
        var li = document.createElement("li");
        li.textContent = stock;
        stockEl.appendChild(li);
    }
}

// getApi(requestURL, "GOOG");


searchBtnEl.addEventListener("click", function() {
    getApi(requestURL, txtBoxEl.value);
    txtBoxEl.value = "";
})

function init(stockList) {
    for (var i = 0; i < defaultStocks.length; i++) {
        result = stockList.find(s => s.T === defaultStocks[i]);
        stocks.push(result.T + ", close: " + result.c + ", high: " + result.h + ", low: " + result.l + ", transactions: " + result.n);
        renderStocks(result); 
    }
    
}:

// TODO":
// most recent buisness day
// populate initial load with default stocks
// 
