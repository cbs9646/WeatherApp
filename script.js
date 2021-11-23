  let requestedUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=dallas&cnt=1&appid=ae0ce5ce2adbe30790cc3682a20204c0';
  let oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=ae0ce5ce2adbe30790cc3682a20204c0';


  fetch(requestedUrl)
  .then(function(response) {
    return response.text();
  })
  .then(function (data) {
   for (var i = 0; i < data.length; i++) {
      console.log(data[i].main.temp);
    }
  });


  fetch(oneCallUrl)
  .then(function(response) {
    return response.text();
  })
  .then(function (data) {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].current.uvi);
      
    }
  });



