if('geolocation' in navigator){
   navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesnt Support Geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}