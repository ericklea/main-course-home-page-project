// var week = 
var amazon = 'https://api.polygon.io/v1/open-close/AMZN/2023-03-31?&apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var serviceNow = 'https://api.polygon.io/v1/open-close/NOW/2023-03-31-1?apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var alphabetInc = 'https://api.polygon.io/v1/open-close/GOOG/2023-03-31-1?apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var disney = 'https://api.polygon.io/v1/open-close/DIS/2023-03-31-1?apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var paloAlto = 'https://api.polygon.io/v1/open-close/PANW/2023-03-31-1?apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var boeing = 'https://api.polygon.io/v1/open-close/BA/2023-03-31-1?apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var prologis = 'https://api.polygon.io/v1/open-close/PLD/2023-03-31-1?apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';
var jAndJ = 'https://api.polygon.io/v1/open-close/JNJ/2023-03-31-1?apiKey=1cw4p56EVUjieQaTpTQxhiapI8vsGjCF';

//FIGURE OUT A METHOOD TO GET THE MOST RECENT BUISNESS DAY

var stockArray = [amazon, serviceNow, alphabetInc, disney, paloAlto, boeing, prologis, jAndJ];

function getApi(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        
};
// for (var i = 0; i < 5; i++) {
//     getApi(stockArray[i]);
// };

getApi(amazon);
