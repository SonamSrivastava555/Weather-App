
import { IoSearchOutline } from "react-icons/io5";
import './weather.css'
import search_icon from '../assets/search_icon.png'
import clear from '../assets/clear.png'
import humidity_icon from '../assets/humidity_icon.png'
import wind_icon from '../assets/wind_icon.png'
import { useEffect,useState,useRef } from 'react';


const Weather = () => {
   const inputRef = useRef("");                       
const [weatherData,setWeatherData]=useState(false);
const [city, setCity] = useState("");
  const search= async(city)=>{
    if(city===""){
      alert("Enter City Name")
      return;
    }
    try {
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
const response= await fetch(url)
const data=await response.json();
if(!response.ok){
  alert(data.message);
  return;
}



console.log(data)
setWeatherData({
  humidity:data.main.humidity,
  temprature:Math.floor(data.main.temp),
  location:data.name,
  windSpeed:data.wind.speed,
   icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
})
    } catch (error) {
     console.error("Error fetching weather data:", error) 
     setWeatherData(false)
    }
  }
useEffect(() => {
  search("New York")
}, [])

  return (
    <div className='Weather'>
       <div className='searchBar'>
        <input ref={inputRef} type="text" placeholder='Search city ' />
       <img src={search_icon} alt="Search" onClick={()=>search(inputRef.current.value)} />
       </div>
       {weatherData?<>
       <img src={weatherData.icon} alt="" className='clear_icon' />
      <p className='temprature'> today temp:{weatherData.temprature}°C</p>
      <p className='location'>{weatherData. location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt=""  />
          <div>
            <p>{weatherData.windSpeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
       </>:<></>}
      </div>
  )
}

export default Weather