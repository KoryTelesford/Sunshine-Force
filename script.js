console.log(weatherApiKey)

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
        console.log(data.weather[0].main);
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
        
        let temp = Math.floor(data.main.temp)
        
        city.innerHTML = data.name
        currTemp.innerHTML = `${temp}°F`
        desc.innerHTML = data.weather[0].description

        //Append 
        
        const top = document.getElementById("top")
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

    console.log('Weather forecast data:', data);
    
    const forcasts = data.list.slice(0,6)
    // console.log(forcasts)
    
    let forcastDiv = document.getElementById("forcast")
    
   
    forcasts.forEach(forcast => {
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        let temps = Math.floor(forcast.main.temp)
        h3.textContent = temps
        
        console.log(temps)
        forcastDiv.appendChild(h3)
        document.body.appendChild(forcastDiv)
        
    })
    
    
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


fetchWeatherForecast(cityName);
//Call API
weatherTest()
