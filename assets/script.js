// variables
const topBtn = document.querySelector('#top');
const allBtn = document.querySelector('#all');
const newsDetails = document.querySelector('.newsDetails');



// api
const apiKey = "B8obJ29wIgz6d0b8Y6DUZ2Oeh7D8FpdydtqDDp6h"
const TopNews = "https://api.thenewsapi.com/v1/news/top?api_token=B8obJ29wIgz6d0b8Y6DUZ2Oeh7D8FpdydtqDDp6h&locale=us&limit=3";
const AllNews = "https://api.thenewsapi.com/v1/news/all?api_token=B8obJ29wIgz6d0b8Y6DUZ2Oeh7D8FpdydtqDDp6h&language=en&limit=3"


topBtn.addEventListener('click',function(){
    fetchTopNews()
});

allBtn.addEventListener('click',function(){
    fetchAllNews();
});



const fetchTopNews = () => {
    return fetch(TopNews + apiKey)
      .then(response => response.json())
      .then(data => {
          console.log(data);
         var newsDataArray = data;
          console.log(newsDataArray);
          displayNews(newsDataArray); 
      })
      .catch(error => console.log(error));
  }

const fetchAllNews = () => {
    return fetch(AllNews + apiKey)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          newsDataArray = data;
          displayNews(newsDataArray); 
      })
      .catch(error => console.log(error));
  }


// functions
function displayNews(news) {
        console.log(news.data[0].published_at);
        for (let i = 0; i < news.data.length; i++) {
        var date = news.data[i].published_at.split('T')[0];
        console.log(date);
        var col = document.createElement('div');
        var card = document.createElement('div');
        var image = document.createElement('img');
        image.src= news.data[i].image_url;
        var cardBody = document.createElement('div');
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.data[i].title;
        var dataHeading = document.createElement('h6');
        dataHeading.innerHTML = date[0];
        var newsDescription = document.createElement('p');
        newsDescription.innerHTML = news.data[i].description;
        var link = document.createElement('a');
        link.setAttribute("target", "_blank");
        link.href = news.data[i].url;
        link.innerHTML = "Read More";
        cardBody.append(newsHeading);
        cardBody.append(dataHeading);
        cardBody.append(newsDescription);
        cardBody.append(link);
        card.append(image);
        card.append(cardBody);
        col.append(card);
        newsDetails.append(col);
    };
}


