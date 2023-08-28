console.log(weatherApiKey)

//Input values
const cityName = 'amsterdam'
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
            default :
                weatherMood = 'unknown';
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


//Call API
weatherTest()
