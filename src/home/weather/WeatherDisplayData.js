import React from 'react';
import { WiRaindrop } from 'react-icons/wi';
import { GiSunset} from 'react-icons/gi';
import styles from './WeatherApi.module.scss';
import { v4 as uuidv4 } from 'uuid';




const WeatherDisplayData = ({weatherApiData}) => {
            
    const forcastWeatherDisplayed = () => {
        
        const dateToDisplay = (daysBefore) => {
            let displayDate = new Date();
            displayDate.setDate( displayDate.getDate() + daysBefore)
            let [day, , date, ] = displayDate.toDateString().split(' ');
            let suffix;
            if(date[1] === '1'){
                suffix = 'st'
            } else if(date[1] === '2'){
                suffix = 'nd'
            } else if(date[1] === '3'){
                suffix = 'rd'
            } else {
                suffix = 'th'
            }
            date = Number(date);
            return (`${day} ${date}${suffix}`) ;
        }

        let forcastWeatherArray = [];

        for(let i = 1; i < 6; i++){
            forcastWeatherArray.push(           
                <div className={styles.forcast_day_container} key={uuidv4()}>
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
        
            <div className={styles.weather_display_container}>
                <h3 className={styles.today_title}>Today</h3>
                <div className={styles.current_weather_container}>
                    <div className={styles.current_weather_icon_container} >
                        <img src={`https://www.weatherbit.io/static/img/icons/${weatherApiData.currentWeather.iconCode}.png `} className={styles.current_weather_icon} alt="weather" />       
                        <h5>{Math.round(weatherApiData.currentWeather.temperture)}&deg;C</h5>    
                    </div>
                    <div className={styles.current_weather_max_min_container} >
                        <h5 className={styles.max_temp}>{maxCurrentTemp}&deg;C</h5>
                        <h5 className={styles.min_temp}>{Math.round(weatherApiData.forcastWeather[0].minTemperture)}&deg;C</h5>
                    </div>
                    <div className={styles.current_weather_sunset_container} >
                        <GiSunset className={styles.sunset_icon} />
                        <h5>{weatherApiData.currentWeather.sunset}</h5>
                    </div>               
                </div>
                <div className={styles.forcast_container}>
                    {forcastWeatherDisplayed()}
                </div>
            </div>
               
    )
}

export default WeatherDisplayData;
