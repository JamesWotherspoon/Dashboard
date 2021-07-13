import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { WiRaindrop } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { GiSunset} from 'react-icons/gi';
import styles from './home.module.scss';


const WeatherDisplay = ({currentWeather, forcastWeather, postcode, setWeatherInputOpen}) => {

    const dateToDisplay = (daysBefore) => {
        let displayDate = new Date();
        displayDate.setDate( displayDate.getDate() + daysBefore)
        let [day, month, date, year] = displayDate.toDateString().split(' ');
        date = Number(date);
        let suffix;
        if(date[2] === 1){
            suffix = 'st'
        } else if(date[2] === 2){
            suffix = 'nd'
        } else if(date[2] === 3){
            suffix = 'rd'
        } else {
            suffix = 'th'
        }
        return (<h3>{day} {date}{suffix}</h3>) ;
    }

    const currentWeatherDisplayed = () => {
        let currentWeatherArray = [];
        if(currentWeather !== undefined){
            
            currentWeatherArray = (
                <div className={styles.current_weather_container}>
                    <div className={styles.left} >
                        
                        <img src={`https://www.weatherbit.io/static/img/icons/${currentWeather.iconCode}.png `} className={styles.current_weather_icon} alt="weather" />
                    </div>
                    <div className={styles.right} >
                        
                        <h5>
                            <FaTemperatureHigh className={styles.high_temp_icon}/>
                            {Math.round(currentWeather.temperture)}&deg;C
                        </h5>
                        <h5>
                            <GiSunset className={styles.sunset_icon} />
                            {currentWeather.sunset}
                        </h5>
                    </div>
                </div>)
        }
        return currentWeatherArray
    }

    const forcastWeatherDisplayed = () => {
        let forcastWeatherArray = [];
        if(forcastWeather !== undefined){
            
            for(let i = 1; i < 7; i++){
                forcastWeatherArray.push(
                    <div key={`forcast_${i}`} className={styles.forcastDay}>
                        <h3>{dateToDisplay(i)}</h3>
                        <img src={`https://www.weatherbit.io/static/img/icons/${forcastWeather[i].iconCode}.png`} className={styles.forcast_weather_icon} alt="weather" />
                        <h5 key={`forcast_temp_${i}`}>
                            
                            {Math.round(forcastWeather[i].temperture)}&deg;C
                        </h5>
                        <h5 key={`forcast_rain_${i}`}>
                            <WiRaindrop className={styles.rain_icon}/> 
                             {forcastWeather[i].chanceOfRain}&#37; 
                        </h5>
                    </div>
                )
            };
        }
        return forcastWeatherArray;
    }

    return (
        <div className={`${styles.weather_display_container} ${styles.component}`}>
            <BsThreeDots className={styles.edit_icon} onClick={() => setWeatherInputOpen(true)}/>
            <div className={styles.weather_header}>
                <h3 className={styles.today}>Today</h3>
                <h3>{postcode}</h3>
            </div>
            {currentWeatherDisplayed()} 
            <div className={styles.forcast_day_container}>
                {forcastWeatherDisplayed()}
            </div>
        </div>
    )
}

export default WeatherDisplay;
