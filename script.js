// console.log(weatherApiKey)

//Input values
let cityName = 'New York'
let weatherMood;

//Saves City Name
if(localStorage.getItem('CityName') === null) {
    localStorage.setItem('CityName', cityName)
} else {
    cityName = localStorage.getItem('CityName')
}

//import Api
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.cheeseCake}&units=imperial`

//Pass Value to WeatherTest to change weather value.
const handle = (event) => {
    if(event.key === "Enter") {
        // searchvalue =
        event.preventDefault()
        cityName =  document.getElementById('search_in').value;
        localStorage.setItem('CityName', cityName)
        console.log(cityName)
        history.go(0);

    }

    return false;
}


//Get current weather function
const weatherTest = async () => {

    try {

        //fetch API
        const res = await fetch(apiUrl);
        const data = await res.json()

        // console.log(data)

        weatherMood = data.weather[0].main;
        
        const alertText = document.getElementById("toast-body")
        
        if(weatherMood === "Clouds"){
            alertText.innerHTML = "Oh it looks very cloudy outside"
        } else if (weatherMood === "Clear"){
            alertText.innerHTML = "It's so sunny! Yaya"
        } else if (weatherMood === "Thunderstorm"){
            alertText.innerHTML = "BOOOOM make sure to bring Umbrella"
        } else if (weatherMood === "Drizzle"){
            alertText.innerHTML = "Plip Plap Plop"
        } else if (weatherMood === "Rain"){
            alertText.innerHTML = "Make Sure to Bring an Umbrella"
        } else if (weatherMood === "Snow"){
            alertText.innerHTML = "It's snowing! Time to build a snowman!"
        }
        
        //background
        const backgroundImages = {
            'Clouds': 'cloudy.jpg',
            'Clear': 'clearsky.gif',
            'Thunderstorm': 'thunder.gif',
            'Drizzle': 'rain.gif',
            'Rain': 'rain.gif',
            'Snow': 'snow.gif'
            
        };

        if (backgroundImages.hasOwnProperty(weatherMood)) {
            const backgroundImage = backgroundImages[weatherMood];
            document.body.style.cssText = `
            background-image: url("assets/${backgroundImage}");
            background-repeat: no-repeat;
            background-size: cover;
              `;
        }

        //spotify mood condition 

        switch (data.weather[0].main) {
            case 'Rain':
                weatherMood = 'sad'
                break;
            case 'Drizzle':
                weatherMood = 'sad'
                break;
            case 'Thunderstorm':
                weatherMood = 'sad'
                break;
            case 'Snow':
                weatherMood = 'all i want for christmas'
                break;
            case 'Clear':
                weatherMood = 'happy'
                break;
            case 'Clouds':
                weatherMood = 'lofi'
                break;
            case 'Torando':
                weatherMood = 'rock'
                break;
            case undefined:
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

setInterval(weatherTest, 1000)


// 6 day forcast

async function getDayOfWeekForecast(dayOfWeek) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${config.cheeseCake}&units=imperial`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log(data)

        if (response.ok) {
            const forecastList = data.list;

            const dayForecast = forecastList.find(item => {
                const date = new Date(item.dt * 1000);
                return date.getDay() === dayOfWeek;
            });

            if (dayForecast) {
                const date = new Date(dayForecast.dt * 1000);
                const temperature = Math.round(dayForecast.main.temp);
                const description = dayForecast.weather[0].description;

                const dayElement = document.getElementById(`day${dayOfWeek}`);
                const imgElement = document.getElementById(`day${dayOfWeek}Img`);
                const forecastElement = document.getElementById(`day${dayOfWeek}f`);

                dayElement.textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
                imgElement.src = `https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}.png`;
                forecastElement.textContent = `${temperature}°F \n ${description}`;
            }
        }
        else {
            console.error('Error fetching data:', data.message);
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}

for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    getDayOfWeekForecast(dayOfWeek);
}



weatherTest()


const replaceImages = () => {
    const imageContainer = document.getElementById('photo-album');
    
    // Remove all existing images from the container
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }
    for (let i = 0; i < 3; i++) {
        RandomImage();
    }
};

const RandomImage = async () => {
    try {
        const apiUrl = 'https://random.imagecdn.app/300/400';
        const res = await fetch(apiUrl);
        if (res.ok) {
            const imageURL = await res.url;

            const image = document.createElement('img');
            image.src = imageURL;

            const imageContainer = document.getElementById('photo-album');
            imageContainer.appendChild(image);
        } else {
            console.error(`Failed to fetch image. Status code: ${res.status}`);
        }
    } catch (err) {
        console.error('Error:', err);
    }
};

const generateImageButton = document.getElementById('generate-image-button');

generateImageButton.addEventListener('click', () => {
    replaceImages();
});




const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

document.addEventListener('DOMContentLoaded', () => {
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  });
