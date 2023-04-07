if('geolocation' in navigator){
   navigator.geolocation.getCurrentPosition(setPosition);
}

function setPosition(position){
    let latitude = position.coords.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}
