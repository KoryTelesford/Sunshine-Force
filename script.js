// console.log(weatherApiKey)

//Input values
const cityName = 'miami'
let weatherMood;

//import Api
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=imperial`

//Get current weather function
const weatherTest = async () => {
    
    try {

        //fetch API
        const res = await fetch(apiUrl);
        const data = await res.json()
        
        //spotify mood condition 
        // console.log(data.weather[0].main);
        switch(data.weather[0].main) {
            case 'Rain' :
                weatherMood = 'sad'
                break;
            case 'Drizzle' :
                weatherMood = 'sad'
                break;
            case 'Thunderstorm' :
                weatherMood = 'sad'
                break;
            case 'Snow' :
                weatherMood = 'all i want for christmas'
                break;
            case 'Clear' :
                weatherMood = 'happy'
                break;
            case 'Clouds' :
                weatherMood = 'lofi'
                break;
            case 'Torando' :
                weatherMood = 'rock'
                break;
            case undefined :
                weatherMood = 'lofi'
                break;
            default:
                weatherMood = 'lofi';
        }
        
        //create Elements
        const city = document.getElementById("cityname")
        const currTemp = document.getElementById("temp")
        const desc = document.getElementById("desc")
        const high = document.getElementById("high")
        const low = document.getElementById("low")
        const top = document.getElementById("top")
        
        //Round down to the nearest whole number
        let temp = Math.floor(data.main.temp)
        let highTemp = Math.floor(data.main.temp_max)
        let lowTemp = Math.floor(data.main.temp_min)
        
        //append 
        city.innerHTML = data.name
        currTemp.innerHTML = `${temp}°F`
        high.innerHTML = highTemp
        low.innerHTML = lowTemp
        desc.innerHTML = data.weather[0].description
        top.append(city)
        top.append(currTemp)
        top.append(desc)

    
        //get time 

        const currentTimeUTC = new Date().getTime() + (data.timezone * 1000);
        const currentTime = new Date(currentTimeUTC).toLocaleTimeString();
        console.log(`Current time ${currentTime}`);


    }
    catch (err) {
        console.log("Error: ", err)
    }
}


// 6 day forcast

const fetchWeatherForecast = async(cityName) => {
 const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${weatherApiKey}&units=imperial`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // console.log('Weather forecast data:', data);
    
    const forcasts = data.list.slice(0,6)
    console.log(forcasts)
    
    let forcastDiv = document.getElementById("forcast")
    
    let forcastArray = [];
   
   // get temp of each element 
    forcasts.forEach(forcast => {
        let temps = Math.floor(forcast.main.temp)
        forcastArray.push(temps)
    })
    
    //get elements 
    
    const now = document.getElementById("nowf")
    const day1 = document.getElementById("day1f")
    const day2 = document.getElementById("day2f")
    const day3 = document.getElementById("day3f")
    const day4 = document.getElementById("day4f")
    const day5 = document.getElementById("day5f")
    
    now.innerHTML = forcastArray[0]
    day1.innerHTML = forcastArray[1]
    day2.innerHTML = forcastArray[2]
    day3.innerHTML = forcastArray[3]
    day4.innerHTML = forcastArray[4]
    day5.innerHTML = forcastArray[5]
    
    
    console.log(forcastArray)
    
    
    
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


fetchWeatherForecast(cityName);
//Call API
weatherTest()
