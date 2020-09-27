const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img")//any image inside an icon classed container
const forecast = new Forecast();


const updateUI = (jsonData) => {
  //const cityDetails = jsonData.cityDetails;
  //const conditions = jsonData.conditions;

  //destructuring from commands above (results in same variables)
  const { cityDetails, conditions } = jsonData;

  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${conditions.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${conditions.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  const iconSrc = `../images/icons/${conditions.WeatherIcon}.svg`;
  let timeImgSrc = null;
  if (conditions.IsDayTime) {
    timeImgSrc = "../images/icons/day.svg";
  } else {
    timeImgSrc = "../images/icons/night.svg";
  }

  time.setAttribute("src", timeImgSrc);
  icon.setAttribute("src", iconSrc);

  //show up icon card
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", event => {
  event.preventDefault();

  const city = cityForm.cityInput.value.trim();

  cityForm.reset();

  //updating UI
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error.message));

  //storing chosen city in local storage
  localStorage.setItem("city", city);
});

//if city is same as last request
if (localStorage.getItem("city")) {
  forecast.updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(error => console.log(error));
}