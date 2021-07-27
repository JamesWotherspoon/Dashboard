import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { WiRaindrop } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { GiSunset} from 'react-icons/gi';
import styles from '../home.module.scss';




const WeatherDisplayData = ({weatherApiData}) => {
            
    const forcastWeatherDisplayed = () => {
        
        const dateToDisplay = (daysBefore) => {
            let displayDate = new Date();
            displayDate.setDate( displayDate.getDate() + daysBefore)
            let [day, , date, ] = displayDate.toDateString().split(' ');
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
            return (`${day} ${date}${suffix}`) ;
        }

        let forcastWeatherArray = [];

        for(let i = 1; i < 6; i++){
            forcastWeatherArray.push(
                <div key={`forcastWeatherCont_${i}`}>
                    <div key={`forcast_${i}`} className={styles.forcast_day_container}>
                        <h3 >{dateToDisplay(i)}</h3>
                        <img src={`https://www.weatherbit.io/static/img/icons/${weatherApiData.forcastWeather[i].iconCode}.png`} className={styles.forcast_weather_icon} alt="weather" />
                        <div className={styles.forcast_day_data} >
                            <h5  className={styles.forcast_rain}>
                                <WiRaindrop key={`rainIcon_${i}`} className={styles.rain_icon}/> 
                                {weatherApiData.forcastWeather[i].chanceOfRain}&#37; 
                            </h5>
                            
                            <div key={`forcastTemp_${i}`} className={styles.forcast_min_max_temp} >
                                <h5  >
                                    {Math.round(weatherApiData.forcastWeather[i].maxTemperture)}&deg;C
                                </h5>
                                <h5 >
                                    {Math.round(weatherApiData.forcastWeather[i].minTemperture)}&deg;C
                                </h5>
                            </div>
                        </div>
                    </div>
                    {i !== 5 ? <hr /> : null}
                </div >
            )
        };

        return forcastWeatherArray;
    }

    // Check if forcast max temp for today, is not less than current temp, change to higher max temp
    let maxCurrentTemp;
    if( weatherApiData.currentWeather.temperture > weatherApiData.forcastWeather[0].maxTemperture){
        maxCurrentTemp = Math.round(weatherApiData.currentWeather.temperture)
    } else {
        maxCurrentTemp = Math.round(weatherApiData.forcastWeather[0].maxTemperture)
    }

    return (        
        <div className={`${(weatherApiData) ? styles.container_for_opacity_change_on_loaded : styles.container_for_opacity_change_on_loading}`} > 
            <div className={`${styles.weather_display_container} ${styles.component}`}>
                <div className={styles.current_weather_container}>
                    <div className={styles.weather_header}>
                        <h3 className={styles.today}>Today</h3>
                    </div>
                    <div className={styles.currentWeather_temp_icon_container} >
                        <img src={`https://www.weatherbit.io/static/img/icons/${weatherApiData.currentWeather.iconCode}.png `} className={styles.current_weather_icon} alt="weather" />       
                        <div className={styles.currentWeather_temp_container} >
                            <h5>
                                {Math.round(weatherApiData.currentWeather.temperture)}&deg;C
                            </h5>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.currentWeather_max_min_container} >
                        <h5 className={styles.max_temp}>{maxCurrentTemp}&deg;C</h5>
                        <h5 className={styles.min_temp}>{Math.round(weatherApiData.forcastWeather[0].minTemperture)}&deg;C</h5>
                    </div>
                    <hr />
                    <div className={styles.sunset_container} >
                        <GiSunset className={styles.sunset_icon} />
                        <h5>
                            {weatherApiData.currentWeather.sunset}
                        </h5>
                    </div>               
                </div>
                <div className={styles.forcast_container}>
                    {forcastWeatherDisplayed()}
                </div>
            </div>
        </div>         
    )
}

export default WeatherDisplayData;
