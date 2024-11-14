import React, { useEffect, useState } from 'react'
import search_icon from '../assets/search.png';
import clear from '../assets/clear.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';  
import './app.css';

const Weather = () => {

    const [weatherData ,setweatherData] =useState(false)
    const [cityName ,setcityName] =useState('')
   

    const icon={
        '01d':clear,
    }

    const search =async()=>{
        if(cityName === ''){
            alert('Enter your city name');
            return;
        }
        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
            const response = await fetch(url);  
            const data =await response.json()

            if(!response.ok){
                alert(data.message);
                return;
            }
            setcityName('')
            setweatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                // icon: data.weather[0].icon
                icon: data.weather[0].icon === '01d' ? icon['01d'] : data.weather[0].icon,
                country:data.sys.country,
                min_temp:data.main.temp_min,
                max_temp:data.main.temp_max

            })
            console.log('weather data' , data)

        } catch (error) {
            
        }
    }


    


  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type="text" value={cityName} onChange={(e) =>setcityName(e.target.value)} placeholder='search' />
            <img src={search_icon} alt="image loading" onClick={()=>search()} />
        </div>
        <img   
         src={
            weatherData.icon === clear
              ? clear
              : `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`
          }
        
        alt=""  className='weather-icon'/>

        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <p>{weatherData.country}</p>

        <div className="min-max">
            <span>maximum {weatherData.max_temp}°C</span>
            <span>Minimum {weatherData.min_temp}°C</span>
                
        </div>
        
        <div className="weather-data">

    
            <div className="col">
                
                <img src={humidity} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                
                <img src={wind} alt="" />
                <div>
                    <p>{weatherData.windSpeed} KM/H</p>
                    <span>Wind speed</span>
                </div>
            </div>


        </div>
 </div>
  )
}

export default Weather