
import React, { useState, useEffect, useRef } from 'react';
import styles from './home.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import WeatherDisplay from './weatherDisplay';
import { IoMdRefresh } from 'react-icons/io';
import { IoIosArrowRoundBack } from 'react-icons/io';
import AbortController from "abort-controller";

const LoadingAndErrorHandling = ({statusOfWeatherApi, openPostcodeInput, errorMessage}) => {

    const renderSwitch = (param) => {
        switch(param) {
            case 'loading':
                return (
                    <div className={`${styles.is_loading}`} >
                        <div className={styles.loading_ring_container} >
                            <div className={styles.loading_ring} >
                            </div>
                        </div>
                    </div> 
            );
            case 'error':
                return ( 
                    <div className={styles.error_message_container}>
                        <div className={styles.retry_api}>
                            <IoMdRefresh  onClick={() => openPostcodeInput()}/>
                        </div>     
                        <div>
                            <h2>Weather API not successfull</h2>
                            <h2>{errorMessage}</h2>
                            <h5>Please ensure you have entered the correct postcode</h5>
                        </div>         
                    </div>
                );
            case 'noPostcodeParameterSubmitted':
                return (
                    <div className={styles.default_handling_container}>
                        <h2>Please Submit a Postcode</h2>
                        <IoIosArrowRoundBack onClick={() => openPostcodeInput()}/>
                    </div>
                )
            default: 
                return (
                    <div className={styles.default_handling_container}>
                        <h2>Error with statusOfWeatherApi</h2>
                        <h2>This issue will be resolved as soon as possible</h2>
                    </div>
                )
        };
    };

    return renderSwitch(statusOfWeatherApi)
}


const Weather = () => {
    const [togglePostcodeInput, setTogglePostcodeInput] = useState(false);
    const [postcode, setPostcode] = useState({input: '', submitted: ''});

    const [weatherDataState, setWeatherDataState] = useState();

    // Error and loading handling
    const [errorMessage, setErrorMessage] = useState();
    const [statusOfWeatherApi, setStatusOfWeatherApi] = useState();

    //retirieve postcode from localStorage and set postcode to state
    useEffect(() => {
        let postcodeStored = JSON.parse( localStorage.getItem('postcode') );
        if(postcodeStored === null){
            setTogglePostcodeInput(true);
            setStatusOfWeatherApi('noPostcodeParameterSubmitted')
        } else {
            setPostcode((prev) => {return {...prev, submitted: postcodeStored}});
        }
    }, []);
    
    // handle postcode submittion, loading screen and fetch
    useEffect(() => {
        if(postcode.submitted){
            setStatusOfWeatherApi('loading');
            console.log(postcode.submitted)
            const abortController = new AbortController();
            const signal = abortController.signal;

            let postcodeUrlfragment = postcode.submitted;
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
                console.log('response')
                if(responses[0].status === 200 && responses[1].status === 200){ 
                    
                    console.log('Weather: Request Successfull')
                    return Promise.all(responses.map((response) => {
                        return response.json()
                    }))

                } else {
                    console.log('else on response status ')
                    throw new Error(
                        'HTTP Status: ' + responses.status
                    );
                }      
            })
            .then(data => {
                let forcastWeatherObject = {};
                for(let i = 0; i < 6; i++){
                    forcastWeatherObject = {
                        ...forcastWeatherObject,
                        [i]: {
                            weather: data[1].data[i].weather.description,
                            iconCode: data[1].data[i].weather.icon,
                            max_temperture: data[1].data[i].app_max_temp,
                            min_temperture: data[1].data[i].app_min_temp,
                            chanceOfRain: data[1].data[i].pop
                        }
                    }
                };

                setWeatherDataState({currentWeather: {
                    weather: data[0].data[0].weather.description,
                    temperture: data[0].data[0].temp,
                    iconCode: data[0].data[0].weather.icon,
                    chanceOfRain: data[0].data[0].pop,
                    sunset: (() => {
                        //API is an hour early for sunset, it might not be adjusting for daylight saving time, check on Sunday 31st October
                        let [hours , minutes] = data[0].data[0].sunset.split(':');
                        hours = Number(hours) + 1;
                        return `${hours}:${minutes}`
                    })()
                }, forcastWeather: forcastWeatherObject})

            })
            .catch( error => {           
                setPostcode({input: '', submitted: ''});
                setWeatherDataState();
                alert(error);
                localStorage.removeItem('postcode');
                setErrorMessage(error.message);
                setStatusOfWeatherApi('error');
            })
            
            return () => {
                abortController.abort();
            }
        } 
    }, [postcode.submitted])
    
    // Handle postcode input and submit
    const inputChange = (event) => {
        setPostcode((prev) => {return {...prev, input: event.target.value.toUpperCase()}})
    };
    
    const submitPostcode = (event)=> {
        event.preventDefault();
        setWeatherDataState();
        setPostcode(prev => {return {...prev, submitted: postcode.input}})
        localStorage.setItem('postcode', JSON.stringify(postcode.input));
        setTogglePostcodeInput(false);
    };

    const openPostcodeInput = () => {
        setTogglePostcodeInput(prev => !prev);
    }


    return (
        <section className={`${styles.weather} ${styles.component}`}>
            
            {togglePostcodeInput ? (

                <div className={styles.postcode_input_container} >                  
                    <BsThreeDots className={styles.edit_icon} onClick={() => setTogglePostcodeInput(prev => !prev)}/>
                    <form >
                        <label htmlFor="postcode" >What is your Postcode? </label>
                        <div className={styles.input_button_container}>
                            <input type="text" name="postcode" value={postcode.input} onChange={inputChange} pattern="[a-zA-Z0-9]" minLength="4" maxLength="8" required/>
                            <button onClick={submitPostcode}>Submit</button>
                        </div>
                    </form>
                </div>

            ) : (
                <>
                    <div className={styles.postcode_edit_container}>
                        <h3 className={styles.weather_display_postcode}>{postcode.submitted}</h3>
                        <BsThreeDots className={styles.edit_icon} onClick={() => setTogglePostcodeInput(prev => !prev)}/>  
                    </div>
                    {(weatherDataState) ? 
                        ( 
                        <>
                            <div className={`${(weatherDataState ) ? styles.container_for_opacity_change_on_loaded : styles.container_for_opacity_change_on_loading}`} > 
                                <WeatherDisplay weatherData={weatherDataState}  key={'weatherDisplay'}/> 
                            </div>
                        </>
                        ) : (
                        <LoadingAndErrorHandling statusOfWeatherApi={statusOfWeatherApi} openPostcodeInput={openPostcodeInput} errorMessage={errorMessage}/>
                    )}
    
                </>
            )}
        </section>
    )
}

export default Weather;