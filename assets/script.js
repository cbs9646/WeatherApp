let cityBtn = document.querySelector("#city-button");
let weatherP = document.querySelector("#weather-p");
let cityDisplay = document.querySelector("#cityname");
let tempDisplay = document.querySelector("#temp");
let windSpeed = document.querySelector("#windspeed");
let humidity = document.querySelector("#humidity");
let uvIndexDisplay = document.querySelector("#uvindexdisplay");
let weatherIcon = document.querySelector("#weather-icon");
let cityResultList = document.querySelector("#cityresultlist");
let forecast = document.querySelector("#forecast");
let uvIndex = document.querySelector("#uvindex");
let cityResult; //city search result
let iconNumber;
let storage = []; //stores result data

searchRetrieveButton();

function fiveDayWeather() {
  cityResult = document.querySelector("#city-result").value;
  searchBtnCreate();
  weatherApi(cityResult);
}

function weatherApi() {
  let requestedUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityResult}&appid=ae0ce5ce2adbe30790cc3682a20204c0`;

  fetch(requestedUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (fiveDayWeather) {
      console.log(fiveDayWeather);
      cityDisplay.textContent = fiveDayWeather.city.name;

      let lat = fiveDayWeather.city.coord.lat;
      let lon = fiveDayWeather.city.coord.lon;

      cityResult = document.querySelector("#city-result").value;
      let requestedUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=ae0ce5ce2adbe30790cc3682a20204c0`;

      fetch(requestedUrl2)
        .then(function (response) {
          return response.json();
        })
        .then(function (currentSet) {
          console.log(currentSet);

          forecast.textContent = currentSet.current.weather[0].main;
          tempDisplay.textContent =
            tempCoversion(currentSet.current.temp) + "°F";
          windSpeed.textContent = currentSet.current.wind_speed + "MPH";
          humidity.textContent = currentSet.current.humidity;
          uvIndexDisplay.textContent = currentSet.current.uvIndexDisplay;
          iconNumber = currentSet.current.weather[0].icon;
          uvIndex.textContent = currentSet.current.uvIndex;
          weatherIcon.innerHTML = `<img src='./assets/images/${iconNumber}.png'/>`;

          //date change

          $(".fivecards .card").each(function () {
            let numberOfDay = parseInt(
              $(this).find(".card-title").attr("data-number")
            );
            let chosenDate = currentSet.daily[numberOfDay];
            iconNumber = currentSet.daily[numberOfDay].weather[0].icon;

            $(this).find(".card-title").text(dateConversion(chosenDate.dt));
            $(this).find(".card-subtext").text(chosenDate.weather[0].main);
            $(this)
              .find(".temperature")
              .text(tempCoversion(chosenDate.temp.day) + "°F");
            $(this)
              .find(".wind")
              .text(chosenDate.wind_speed + "MPH");
            $(this).find(".humidity").text(chosenDate.humidity);
            $(this)
              .find(".weather-icons")
              .html(`<img src='./assets/images/${iconNumber}.png'/>`);
            $(this).find("#uvindex").text(chosenDate.uvi);

            //uvindex color change logic
            if (chosenDate.current.uvi < 3) {
              $("#uvic").addClass("bg-success");
              $("#uvic").removeClass("bg-warning");
              $("#uvic").removeClass("bg-danger");
            } else if (
              chosenDate.current.uvi > 2 &&
              chosenDate.current.uvi < 7
            ) {
              $("#uvic").addClass("bg-warning");
              $("#uvic").removeClass("bg-success");
              $("#uvic").removeClass("bg-danger");
            } else if (chosenDate.current.uvi > 6) {
              $("#uvic").addClass("bg-danger");
              $("#uvic").removeClass("bg-success");
              $("#uvic").removeClass("bg-warning");
            }
          });
        });
    });
}

function dateConversion(dt) {
  let date = new Date(dt * 1000);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function tempCoversion(K) {
  let f = Math.floor((K - 273.15) * (9 / 5) + 32);
  return f;
}

function searchBtnCreate() {
  for (let i = 0; i < storage.length; i++) {
    if (storage[i] === cityResult) {
      return;
    }
  }

  let buttonList = document.createElement("li");
  let prevSearchButton = document.createElement("button");
  prevSearchButton.textContent = cityResult;
  buttonList.append(prevSearchButton);
  cityResultList.append(buttonList);
  storage.push(cityResult);
  localStorage.setItem("storageArray", JSON.stringify(storage));
}

function searchRetrieveButton() {
  storage = JSON.parse(localStorage.getItem("storage")) || [];
  for (let i = 0; i < storage.lenght; i++) {
    let buttonList = document.createElement("li");
    let prevSearchButton = document.createElement("button");
    prevSearchButton.textContent = storage[i];
    buttonList.append(prevSearchButton);
    cityResultList.append(buttonList);
  }
}

$("#cityresultlist").on("click", function (event) {
  weatherApi(event.target.textContent);
});

cityBtn.addEventListener("click", fiveDayWeather);

function uviColorChange() {
  if (currentSet.current.uvi > 2 && currentSet.current.uvi < 7) {
    $("#uvi").addClass("bg-warning");
    $("#uvi").removeClass("bg-success");
  } else if (currentSet.current.uvi > 6) {
    $("#uvi").addClass("bg-warning");
    $("#uvi").removeClass("bg-success");
  }
}
