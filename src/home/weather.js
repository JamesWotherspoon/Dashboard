
import React, { useState, useEffect, useRef } from 'react';
import styles from './home.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import WeatherDisplay from './weatherDisplay';


const Weather = () => {
    const [weatherInputOpen, setWeatherInputOpen] = useState(false);
    const [postcode, setPostcode] = useState();

    // Current Weather API
    const [currentWeatherApiSuccess, setCurrentWeatherApiSuccess] = useState()
    const [currentWeather, setCurrentWeather] = useState();

    // Forcast Weather API
    const [forcastWeatherApiSuccess, setForcastWeatherApiSuccess] = useState()
    const [forcastWeather, setForcastWeather] = useState(); 

    const intialRender = useRef(0);

    // fetch request for Weather API returned JSON, state set for successfull request and state set for input area closed 
    const allWeatherApi = () => {

        const currentWeatherApi = () => {
            
            let postcodeUrlfragment = postcode;
            postcodeUrlfragment = postcodeUrlfragment.toLowerCase().replace(' ', '');
            
            fetch('https://api.weatherbit.io/v2.0/current?&postal_code=' + postcodeUrlfragment + '&country=UK&key=ee3e0148f4364aef87bd19f76b49e6df', {
                method: 'GET'
            })
            .then(response => {
                if(response.status === 200){ 
                    setCurrentWeatherApiSuccess(true); 
                    console.log('Current Request Successfull')            
                    return response.json();
                } else { 
                    setCurrentWeatherApiSuccess(false);
                    throw new Error(
                        'Current weather API not successfull.\r\n HTTP Status: '  + response.status 
                        + '\r\nPlease ensure you have entered the correct postcode'
                    );
                }      
            })
            .then(data => {
                console.log(data);
                setCurrentWeather({
                    weather: data.data[0].weather.description,
                    temperture: data.data[0].temp,
                    iconCode: data.data[0].weather.icon,
                    chanceOfRain: data.data[0].pop,
                    sunset: (() => {
                        //API is an hour early for sunset, it might not be adjusting for daylight saving time, check on Sunday 31st October
                        let [hours , minutes] = data.data[0].sunset.split(':');
                        hours = Number(hours) + 1;
                        return `${hours}:${minutes}`
                    })()
                });            
            })
            .catch( error => {           
                setPostcode();
                setCurrentWeather();
                alert(error);
            });
            
        };

        const forcastWeatherApi = () => {
            let postcodeUrlfragment = postcode;
            postcodeUrlfragment = postcodeUrlfragment.toLowerCase().replace(' ', '');
            
            fetch('https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=' + postcodeUrlfragment +'&country=UK&key=ee3e0148f4364aef87bd19f76b49e6df', {
                method: 'GET'
            })
            .then(response => {
                if(response.status === 200){ 
                    setForcastWeatherApiSuccess(true); 
                    console.log('Forcast Request Successfull')            
                    return response.json();
                } else { 
                    setForcastWeatherApiSuccess(false);
                    throw new Error(
                        'Forcast weather API not successfull.\r\n HTTP Status: '  + response.status 
                        + '\r\nPlease ensure you have entered the correct postcode'
                    );
                }      
            })
            .then(data => {
                console.log(data);
                let forcastWeatherObject = {};
                for(let i = 0; i < 6; i++){
                   
                    forcastWeatherObject = {
                        ...forcastWeatherObject,
                        [i]: {
                            weather: data.data[i].weather.description,
                            iconCode: data.data[i].weather.icon,
                            max_temperture: data.data[i].app_max_temp,
                            min_temperture: data.data[i].app_min_temp,
                            chanceOfRain: data.data[i].pop
                        }
                    }
                };
                
                setForcastWeather(forcastWeatherObject);       
            })
            .catch( error => {           
                setPostcode();
                setForcastWeather();
                alert(error);
            });
        };

        currentWeatherApi();
        forcastWeatherApi();        
    }

    //retirieve postocde from localStorage 
    
    let postcodeStored = JSON.parse( localStorage.getItem('postcode') );

    if(postcodeStored !== null && intialRender.current === 1){   
        intialRender.current = 2;
        allWeatherApi();
    };

    if(postcode === null && weatherInputOpen === false){
        setWeatherInputOpen(true);
    }

    useEffect(() => {
        intialRender.current = 1;
        setPostcode(postcodeStored);
    }, [postcodeStored]);
    
    // Handle postcode input and submit

    const inputChange = (event) => {
        setPostcode(() => event.target.value.toUpperCase())
    };
    const submitPostcode = (event)=> {
        event.preventDefault();
        
        allWeatherApi();
        setWeatherInputOpen(false);
        localStorage.setItem('postcode', JSON.stringify(postcode));
    };





    // Output Value
    return (
        <section className={`${styles.weather} ${styles.component}`}>
            {weatherInputOpen ? (
                
                <div className={styles.postcode_input_container} >
                    <form >
                        <BsThreeDots className={styles.edit_icon} onClick={() => setWeatherInputOpen(false)}/>
                        {currentWeatherApiSuccess ? null : (<p className={styles.error_messsage}>Please ensure a valid postcode is entered</p>)}
                        <label for="postcode" >What is your Postcode? </label>
                        <div className={styles.input_button_container}>
                            <input type="text" name="postcode" value={postcode} onChange={inputChange} pattern="[a-zA-Z0-9]" minLength="4" maxLength="8" required/>
                            <button onClick={submitPostcode}>Submit</button>
                        </div>
                    </form>
                </div>
                
            ) : (
                
                <WeatherDisplay forcastWeather={forcastWeather} currentWeather={currentWeather} postcode={postcode} setWeatherInputOpen={setWeatherInputOpen} />
                
            )}
        </section>
    )
}

export default Weather;