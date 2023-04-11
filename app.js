//DOM Elements
const citySearch = document.querySelector('#city');
const temp = document.querySelector('.temp');
const celsius = document.querySelector('.celsius')
const humidity = document.querySelector('.humidity');
const description = document.querySelector('.description');
const wind = document.querySelector('.wind');
const icon = document.querySelector('.icon')
const searchBar = document.querySelector('.search-bar');
const button = document.querySelector('button');

const weather = {
    apiKey: 'c225b58f55d39235385dfcf0152794d4',
    weatherURL: 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
};


    //Get weather data via AJAX request 
const fetchWeather = async (city) => {
   try {const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weather.apiKey}`)
    return res.data}
    catch {console.error('Invalid city input. Try again.')}
}


    //Construct weather Object with needed data from returned JSON
const makeWeatherObj =  (res) => {
    const weatherObj = {
        city: res.name,
        temp: Math.round(res.main.temp),
        humidity: res.main.humidity,
        wind: Math.round(res.wind.speed),
        description: res.weather[0].description,
        oneWordDescription: res.weather[0].main,
        icon: res.weather[0].icon
    };
    return weatherObj
};


// Update DOM Elements to reflect returned search results
const setDomElements = (weatherObj) => {
    //Set background image from Unsplash using returned city search as last search term. Making returned results feel topical. 
document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${weatherObj.city}')`; 

temp.innerText = weatherObj.temp + '°f' 
celsius.innerText = '/       ' + Math.floor((weatherObj.temp -32) * 5/9) + '°c'
description.innerText = weatherObj.description
humidity.innerText = 'Humidity: ' + weatherObj.humidity+'%';
wind.innerText = 'Wind Speed: ' + weatherObj.wind + 'mph'
citySearch.innerText = `Weather in ${weatherObj.city}`;
icon.src = `https://openweathermap.org/img/wn/${weatherObj.icon}.png`
};


//Orchestrates all functionality to fetch searach city, populate object, then distribute object data to the DOM elements
const getWeather = async (city) => {
        const res = await fetchWeather(city);
        const weatherObj = makeWeatherObj(res);
        setDomElements(weatherObj);
        //reset search value to empty string, clearing previous query
        searchBar.value = '';
};

//Initial invocation of function to have populated landing page
getWeather('sydney')


//Invokes search function when new city is entered
button.addEventListener('click', () => getWeather(searchBar.value));

//handles a keyed "return" invocation of search function
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
    getWeather(searchBar.value)}});

