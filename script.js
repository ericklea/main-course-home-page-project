var stockListEl = document.getElementById("stockL")
var searchBtn = document.getElementById("searchBtn");
var clearBtn = document.getElementById("clearBtn");
var inputEl = document.getElementById("usrinpt");
var historyList = document.getElementById("stockHistL");
var requestURL = 'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-03-31?adjusted=true&apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var stockList;
var result;
var stocks = [];
var defaultStocks = ["NOW", "GOOG", "AMZN", "DIS", "PANW", "BA", "PLD", "JNJ"];
var historyArray = [];


// Leah's location Code \\
// if('geolocation' in navigator){
//     navigator.geolocation.getCurrentPosition(setPosition);
//  }
//  function setPosition(position){
//      let latitude = position.coords.coords.latitude;
//      let longitude = position.coords.longitude;
//      getWeather(latitude, longitude);
//  }

function getApi(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            stockList = data.results;
            localStorage.setItem("Stock List", JSON.stringify(stockList));
        })};

getApi(requestURL);

var testStockList = JSON.parse(localStorage.getItem("Stock List"));
console.log(testStockList);
var testStock = testStockList.find(s => s.T === "AMZN");
console.log(testStock);

function renderStocks() {
    stockListEl.innerHTML = "";
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];
        var stockLi = document.createElement("li");
        stockLi.textContent = stock;
        stockListEl.appendChild(stockLi);
    }};

function newInit() {
    for (var i = 0; i < defaultStocks.length; i++) {
        result = testStockList.find(s => s.T === defaultStocks[i]);
        stocks.push(result.T + ", close: " + result.c + ", high: " + result.h + ", low: " + result.l + ", transactions: " + result.n);
        renderStocks();
        renderHistory();
    }};

newInit();

function newFilterApi(search) {
    result = testStockList.find(s => s.T === search);
    stocks.push(result.T + ", close: " + result.c + ", high: " + result.h + ", low: " + result.l + ", transactions: " + result.n);
    renderStocks();
};

searchBtn.addEventListener("click", function() {
    var input = inputEl.value.toUpperCase();
    newFilterApi(input);
    historyArray.push(input);
    inputEl.value = "";
    localStorage.setItem("Search History", JSON.stringify(historyArray));
    renderHistory();
});

clearBtn.addEventListener("click", function() {
    historyArray = [];
    localStorage.setItem("Search History", JSON.stringify(historyArray));
    renderHistory();
});

function getHistory() {
    var storedHistory = JSON.parse(localStorage.getItem("Search History"));
    if(storedHistory !== null) {
        historyArray = storedHistory;
    }};

function renderHistory() {
    getHistory();
    historyList.innerHTML = "";
    for (var i = 0; i < historyArray.length; i++){
        var histBtn = document.createElement("button");
        histBtn.textContent = historyArray[i];
        historyList.appendChild(histBtn);
    }};

historyList.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        newFilterApi(element.textContent);
    }
});

// TODO":
// Make the searches clickable
//   Check out the todos list, namely clear button

// Process:
// fetch the api and set an array equal to the results.
// add a function to populate default stocks when the page is loaded
// add a search bar and button to search a specific stock by its ticker symbol
// add a history array that interacts with local storage
// make the history lis clickable to re-search them