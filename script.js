var inputEl = document.getElementById("userInput");
var searchBttnEl = document.getElementById("searchBttn")
var requestURL = 'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-03-31?adjusted=true&apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var stockList;
var result;

function getApi(url, search) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            stockList = data.results;
            filterApi(stockList, search);
        })
};

function filterApi(stockList, search) {
    console.log(stockList);
    result = stockList.find(s => s.T === search);
    console.log(result)
};

// getApi(requestURL, "GOOG");

searchBttnEl.addEventListener("click", function() {
    getApi(requestURL, inputEl.value);
})



// TODO:
//
