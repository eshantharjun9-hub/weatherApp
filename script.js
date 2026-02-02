// =========== Taking input ==========
const inputElem = document.querySelector("input");
const buttonElem = document.querySelector("#search");

// DOM elements
const temperatureElem = document.querySelector(".temperature");
const locationElem = document.querySelector(".location");
const timeElem = document.querySelector(".time");
const dayElem = document.querySelector(".day");
const dateElem = document.querySelector(".date");
const conditionElem = document.querySelector(".condition");
const iconElem = document.querySelector(".icon img");

const API_KEY = "c7236d36debb4636a18170654262201";

buttonElem.addEventListener("click", () => {
  const location = inputElem.value.trim();
  if (!location) return;
  fetchWeather(location);
  inputElem.value = "";
});

function fetchWeather(location) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid location");
      }
      return response.json();
    })
    .then((data) => {
      updateDOM(data);
    })
    .catch((error) => {
      alert("Please enter a valid location");
    });
}

function updateDOM(data) {
  const temp = data.current.temp_c;
  const city = data.location.name;
  const condition = data.current.condition.text;
  const icon = data.current.condition.icon;
  const localtime = data.location.localtime;

  const [date, time] = localtime.split(" ");
  const day = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  temperatureElem.textContent = `${temp} °C`;
  locationElem.textContent = city;
  timeElem.textContent = time;
  dateElem.textContent = date;
  dayElem.textContent = day;
  conditionElem.textContent = condition;
  iconElem.src = icon;
}
