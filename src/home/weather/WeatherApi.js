import React, { useState, useEffect } from 'react';
import home from '../home.module.scss';
import styles from './WeatherApi.module.scss';

import AbortController from "abort-controller";
import WeatherInput from './WeatherInput';
import { BsThreeDots } from 'react-icons/bs';
import WeatherDisplayData from './WeatherDisplayData';
import WeatherDefaultMessages from './WeatherDefaultMessages';


const WeatherApi = () => {
    const [weatherApiData, setWeatherApiData] = useState();
    const [postcode, setPostcode] = useState('');

    const [isInputOpen, setIsInputOpen] = useState(true);
    // Error and loading handling
    const [errorMessage, setErrorMessage] = useState();
    const [statusOfWeatherApi, setStatusOfWeatherApi] = useState('loading');
    const [retryFetch, setRetryFetch] = useState(false);

    // options icon click toggle transition classes
    const [optionsIconClick, setOptionsIconClick] = useState(false)

    
    useEffect(() => {
        let localStoragePostcode = localStorage.getItem('postcode');
        if(localStoragePostcode){
            setPostcode( JSON.parse( localStoragePostcode ) );
        } else {
            setPostcode('SW1')
        }
    }, []);


    // handle fetch and set loading or error status 
    useEffect(() => {
        setStatusOfWeatherApi('loading');
        setWeatherApiData(); 

        if(postcode){            
            setIsInputOpen(false);
            const abortController = new AbortController();
            const signal = abortController.signal;

            let postcodeUrlfragment = postcode;
            postcodeUrlfragment = postcodeUrlfragment.toLowerCase().replace(' ', '');

            Promise.all([
                fetch('https://api.weatherbit.io/v2.0/current?&postal_code=' + postcodeUrlfragment + '&country=UK&key=ee3e0148f4364aef87bd19f76b49e6df', {
                    method: 'GET',
                    signal: signal
                }),
                fetch('https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=' + postcodeUrlfragment +'&country=UK&key=ee3e0148f4364aef87bd19f76b49e6df', {
                    method: 'GET',
                    signal: signal
                })
            ])
            .then(responses => {


                if(responses[0].status === 200 && responses[1].status === 200){ 

                    console.log('Weather: Request Successfull')
                    return Promise.all(responses.map((response) => {
                        return response.json()
                    }))

                } else {
                    let rejectedResponseStaus;
                    if(responses[0].status !== 200) rejectedResponseStaus = responses[1].status
                    if(responses[1].status !== 200) rejectedResponseStaus = responses[0].status
                    throw new Error(
                        'HTTP Status: ' + rejectedResponseStaus 
                    );
                }      
            })
            .then(data => {
                
                let forcastWeatherData = {};
                for(let i = 0; i < 6; i++){
                    forcastWeatherData = {
                        ...forcastWeatherData,
                        [i]: {
                            weather: data[1].data[i].weather.description,
                            iconCode: data[1].data[i].weather.icon,
                            maxTemperture: data[1].data[i].app_max_temp,
                            minTemperture: data[1].data[i].app_min_temp,
                            chanceOfRain: data[1].data[i].pop
                        }
                    }
                };

                setWeatherApiData({currentWeather: {
                    weather: data[0].data[0].weather.description,
                    temperture: data[0].data[0].temp,
                    iconCode: data[0].data[0].weather.icon,
                    chanceOfRain: data[0].data[0].pop,
                    sunset: (() => {
                        //API is an hour early for sunset, it might not be adjusting for daylight saving time, check on Sunday 31st October
                        let [hours, minutes] = data[0].data[0].sunset.split(':');
                        hours = Number(hours) + 1;
                        return `${hours}:${minutes}`
                    })()
                }, forcastWeather: forcastWeatherData})

            })
            .catch( error => {           
                setErrorMessage(error.message);
                console.log(error)
                setStatusOfWeatherApi('error');
            })
            
            return () => {
                abortController.abort();
            }
        } else {
            setStatusOfWeatherApi('noPostcodeParameterSubmitted')
        }
    }, [postcode, retryFetch])

    const handlePostcodeChange = (postcodeSubmit) => {        
        if(postcode === postcodeSubmit && weatherApiData){
            handleIsInputOpen(false);
            return
        }
        if(postcode === postcodeSubmit) setRetryFetch(prev => !prev);
        setPostcode(postcodeSubmit);
    }

    const handleIsInputOpen = (isOpen) => {
        if(isOpen === Boolean){
            setIsInputOpen(isOpen)
        } else{
            setIsInputOpen(prev => !prev)
        }
        setOptionsIconClick(prev => !prev);     
    }

    return (
        <section className={`${home.weather} ${styles.weather}`}> 
            <div className={styles.options_icon_container}>  
                <BsThreeDots className={`${styles.options_icon} ${optionsIconClick ?  styles.click_animation_forward : styles.click_animation_reverse }`} onClick={handleIsInputOpen}/>
            </div>        
            {isInputOpen ? (
                <WeatherInput 
                    handlePostcode={handlePostcodeChange} 
                    togglePostcodeInput={handleIsInputOpen}
                />

            ) : (               
                <WeatherApiResponse
                    weatherApiData={weatherApiData}
                    statusOfWeatherApi={statusOfWeatherApi} 
                    togglePostcodeInput={handleIsInputOpen} 
                    errorMessage={errorMessage} 
                    retryFetch={() => setRetryFetch(prev => !prev)}
                    postcode={postcode}
                />
            )}
        </section>
            

    )
}

function WeatherApiResponse({ weatherApiData, statusOfWeatherApi, togglePostcodeInput, errorMessage, retryFetch, postcode}) {
    return (
        <>
            <h2 className={styles.current_postcode}>{postcode}</h2>
            {weatherApiData ? (
                <WeatherDisplayData 
                    weatherApiData={weatherApiData}
                />
            ) : (
                <WeatherDefaultMessages 
                    statusOfWeatherApi={statusOfWeatherApi} 
                    togglePostcodeInput={togglePostcodeInput} 
                    errorMessage={errorMessage} 
                    retryFetch={retryFetch}
                />
            )}     
        </>
    )
}

export default WeatherApi;
