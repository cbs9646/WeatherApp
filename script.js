let cityBtn = document.querySelector("#citybutton");
let weatherP = document.querySelector("#weather-p");
let cityDisplay = document.querySelector("#cityname");
let tempDisplay = document.querySelector("#temp");
let windSpeed = document.querySelector("#windspeed");
let humidity = document.querySelector("#humidity");
let uvindexDisplay = document.querySelector("#uvindexdisplay");
let weatherIcon = document.querySelector("#weather-icon");
let cityResultList = document.querySelector("#cityresultlist");
let forecast = document.querySelector("#forecast");
let uvindex = document.querySelector("#uvindex");
let cityResult;
let iconNumber;
let storage = [];

let requestedUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=dallas&cnt=1&appid=ae0ce5ce2adbe30790cc3682a20204c0";
let oneCallUrl =
  "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=ae0ce5ce2adbe30790cc3682a20204c0";

fetch(requestedUrl)
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].main.temp);
    }
  });

fetch(oneCallUrl)
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].current.uvi);
    }
  });
