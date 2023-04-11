//DOM Elements
const citySearch = document.querySelector('#city');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const description = document.querySelector('.description');
const wind = document.querySelector('.wind');
const searchBar = document.querySelector('.search-bar');
const button = document.querySelector('button');



const weather = {
    apiKey: 'c225b58f55d39235385dfcf0152794d4',
    weatherURL: 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
};



const getWeather = async (city) => {
    //Make AJAX request and set returned data to variable:
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weather.apiKey}`)
   
    //Create weather Object with needed data from returned variable
    const weatherObj = {
        city: res.data.name,
        temp: Math.round(res.data.main.temp),
        humidity: res.data.main.humidity,
        wind: Math.round(res.data.wind.speed),
        description: res.data.weather[0].description,
        oneWordDescription: res.data.weather[0].main,
    };

    //Set background image from Unsplash using returned city search as last search term. Making returned results feel topical. 
document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?landscape, ${weatherObj.city}')`; 


// Update DOM Elements to reflect returned search results
temp.innerText = weatherObj.temp + '° f'
description.innerText = weatherObj.description
humidity.innerText = 'Humidity: ' + weatherObj.humidity+'%';
wind.innerText = 'Wind speed: ' + weatherObj.wind + 'mph'
citySearch.innerText = `Weather in ${weatherObj.city}`;

//reset search value to empty string, clearing previous query
searchBar.value = '';
}

//Initial invocation of function to have populated landing page
getWeather('sydney')


//Invokes search function when new city is entered
button.addEventListener('click', () => getWeather(searchBar.value));

//handles a keyed "return" invocation of search function
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
    getWeather(searchBar.value)}});
