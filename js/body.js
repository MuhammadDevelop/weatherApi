let $currentCelsi = document.querySelector(".sectionOne__gradus")
let $currentCountry =document.querySelector(".sectionOne__country")
let $currentName =document.querySelector(".sectionOne__direction")
let $currentTime =document.querySelector(".sectionOne__time")
let $currentImg =document.querySelector(".sectionOne__img")
let $formInput =document.querySelector(".weather__form")
let $currentDays =document.querySelector(".sectionOne__day")
let $currentLocation =document.getElementById("loacion__src")
let $currentHumidity =document.querySelector(".sun__res")
let $currentSunSet =document.querySelector(".sun__set")
let $currentSunRise =document.querySelector(".sun__rise")
let $currentAirPresure =document.querySelector(".arroew__left--tit") 
let $currentAir =document.querySelector(".arrow__img")  
let $currentChart =document.querySelector(".deogramma__right")  
let $inputCecked = document.getElementById("theme-toggle")
let $weatherAll = document.querySelector(".weatherAll__parent")

console.log($formInput);

const renderDate =(data)=>{
    console.log(data);
$currentCelsi.innerText= data.current.temp_c+"°"
$currentCountry.innerText = data.location.country
$currentChart.innerHTML = `<canvas id="myChart"></canvas>`

$currentName.innerText = data.location.name
$currentName.innerText = data.location.name
$currentName.innerText = data.location.name
$currentImg.src = data.current.condition.icon
$currentHumidity.innerText = data.current.humidity
$currentSunRise.innerText =data.forecast.forecastday[0].astro.sunrise
$currentSunSet.innerText = data.forecast.forecastday[0].astro.sunset
$currentAirPresure.innerText = data.current.wind_kph + " "  + "km/s"
$currentTime.innerText = data.forecast.forecastday[0].astro.sunset
$currentDays.innerText = data.forecast.forecastday[0].date
$currentDays.innerText = data.forecast.forecastday[0].date
$currentAir.style.transform =  `rotate(${data.current.wind_degree}deg)`;
$currentLocation.src =  `https://maps.google.com/maps?q=${data.location.name}%20Dates%10Products&amp;t=&amp;z=12&amp&output=embed`
renderChart(data)
}
const renderChart  =(data)=>{
    let delayed;
    console.log(data);
    const ctx = document.getElementById('myChart');
const hours = data.forecast.forecastday[0].hour.map(hourChange=>hourChange.time.split(" ")[1])
console.log(hours);
const gradus = data.forecast.forecastday[0].hour.map(hourChange=>hourChange.temp_c)
console.log(gradus);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: hours,
        datasets: [{
          label: `Weather data for ${data.location.name}`,
          data: gradus,
          borderColor:"blueviolet",
          borderWidth: 3,
          backgroundColor:"#fff"
        }]
      },
      options: {
        animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
      
        scales: {
            x:{
                grid:{
                    display:false
                },
                ticks:{
                    font:{
                        size:16,
                    },
                }
            },

          y: {
            beginAtZero: false
          }
        }
      }
    });
}
const loadDate = async (cityName)=>{
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${cityName}&days=7&aqi=yes&alerts=yes`)
    let data =  await response.json()
    renderDate(data);
}
loadDate("Andijan")
function searchCityName(e){
    e.preventDefault()
 let inpValue = $formInput.children[0].value
loadDate(inpValue)

}

function changeTheme(){
if($inputCecked.checked){
  localStorage.setItem("theme","dark")
}else{
  localStorage.setItem("theme","light")

}
chackedTheme()
}
const chackedTheme = ()=>{
const getCheced = localStorage.getItem("theme")
if(getCheced == "light"){
$weatherAll.setAttribute("theme","light")
$inputCecked.checked = false
}
else{
  $weatherAll.setAttribute("theme","dark")

$inputCecked.checked = true


}
}
chackedTheme()

$inputCecked.addEventListener("change",changeTheme)
$formInput.addEventListener("submit",searchCityName)