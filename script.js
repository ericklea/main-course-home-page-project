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

// This function fetches the api, sets an array equal to it's results, and then pushes that array to local storage so I can retrieve the information without calling the api each time.
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

// This variable retrieves the results saved in the local storage and is used whenever I need information from the api.
var localStockList = JSON.parse(localStorage.getItem("Stock List"));

// This function clears the html ul that the stocks are appended to, and then re-appends the updated stock list.
function renderStocks() {
    stockListEl.innerHTML = "";
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];
        var stockLi = document.createElement("li");
        stockLi.textContent = stock;
        stockListEl.appendChild(stockLi);
    }};

// This function appends the default stocks when the page is first loaded.
function Init() {
    for (var i = 0; i < defaultStocks.length; i++) {
        result = localStockList.find(s => s.T === defaultStocks[i]);
        stocks.push(result.T + ", close: " + result.c + ", high: " + result.h + ", low: " + result.l + ", transactions: " + result.n);
        renderStocks();
        renderHistory();
    }};

Init();

// This function searches for an object in the stock list by it's ticker symbol, takes that information and creates an li, and then pushes the li to the stocks api to be appended to the "stockL" element.
function filterApi(search) {
    result = localStockList.find(s => s.T === search);
    stocks.push(result.T + ", close: " + result.c + ", high: " + result.h + ", low: " + result.l + ", transactions: " + result.n);
    renderStocks();
};

// This event listener calls filterApi to display a new stock based on the text in the textbox, and then pushes the input to the history array, updates the local storage, and calls renderHistory to display a new button.
searchBtn.addEventListener("click", function() {
    var input = inputEl.value.toUpperCase();
    filterApi(input);
    historyArray.push(input);
    inputEl.value = "";
    localStorage.setItem("Search History", JSON.stringify(historyArray));
    renderHistory();
});

// This event listener clears the history array and then updates the local storage to clear the history buttons when the clear history button is clicked.
clearBtn.addEventListener("click", function() {
    historyArray = [];
    localStorage.setItem("Search History", JSON.stringify(historyArray));
    renderHistory();
});

// This function retrieves the search history from local storage and sets historyArray equal to what was pulled.
function getHistory() {
    var storedHistory = JSON.parse(localStorage.getItem("Search History"));
    if(storedHistory !== null) {
        historyArray = storedHistory;
    }};

// This function creates and appends button elements based on the historyArray.
function renderHistory() {
    getHistory();
    historyList.innerHTML = "";
    for (var i = 0; i < historyArray.length; i++){
        var histBtn = document.createElement("button");
        histBtn.textContent = historyArray[i];
        historyList.appendChild(histBtn);
    }};

// This event listener waits for a history button to be clicked and then runs filterApi to search and render the corresponding stock.
historyList.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        filterApi(element.textContent);
    }
});

// Process:
// fetch the api and set an array equal to the results.
// add a function to populate default stocks when the page is loaded
// add a search bar and button to search a specific stock by its ticker symbol
// add a history array that interacts with local storage
// make the history buttons clickable to re-search them