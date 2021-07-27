import React, { useState, useEffect, useCallback, useContext} from 'react';
import styles from '../home.module.scss';
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

    useEffect(() => {
        setPostcode( JSON.parse( localStorage.getItem('postcode') ) );
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
                console.log(responses.status)
                if(responses[0].status === 200 && responses[1].status === 200){ 
                    
                    console.log('Weather: Request Successfull')
                    return Promise.all(responses.map((response) => {
                        return response.json()
                    }))

                } else {
                    throw new Error(
                        'HTTP Status: ' + responses.status //check here
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
                //alert(error);
                localStorage.removeItem('postcode');
                setErrorMessage(error.message);
                setStatusOfWeatherApi('error');
            })
            
            return () => {
                abortController.abort();
            }
        } else {
            setStatusOfWeatherApi('noPostcodeParameterSubmitted')
        }
    }, [postcode])

    const handlePostcodeChange = (postcodeSubmit) => {
        
        setPostcode(postcodeSubmit);
        // if postcode submitted is the same as current, data already fetched swap to api content display
        if(postcode === postcodeSubmit){
            setIsInputOpen(false);
        }     
        
    }

    const handleIsInputOpen = (isOpen) => {
        if(isOpen === Boolean){
            setIsInputOpen(isOpen)
        } else{
            setIsInputOpen(prev => !prev)
        }     
    }

    const displayApiContent = () => {
        return (
            weatherApiData ? (
                <WeatherDisplayData weatherApiData={weatherApiData}/>
            ) : (
                <WeatherDefaultMessages statusOfWeatherApi={statusOfWeatherApi} togglePostcodeInput={handleIsInputOpen} errorMessage={errorMessage} />
            )
        )

    }


    return (
        <section className={`${styles.weather} ${styles.component}`}>
            <div className={styles.postcode_edit_container}>
                <h3 className={styles.weather_display_postcode}>{postcode}</h3>
                <BsThreeDots className={styles.edit_icon} onClick={handleIsInputOpen}/>  
            </div>

            {isInputOpen ? (
                <WeatherInput handlePostcode={handlePostcodeChange} togglePostcodeInput={handleIsInputOpen}/>

            ) : (               
                displayApiContent()
            )}
        </section>
            

    )
}

export default WeatherApi;