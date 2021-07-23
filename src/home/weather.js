
import React, { useState, useEffect, useRef } from 'react';
import styles from './home.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import WeatherDisplay from './weatherDisplay';
import { IoMdRefresh } from 'react-icons/io';



const Weather = () => {
    const [weatherInputOpen, setWeatherInputOpen] = useState(false);
    const [postcode, setPostcode] = useState();

    // Current Weather API
    const [currentWeatherApiSuccess, setCurrentWeatherApiSuccess] = useState()
    const [currentWeather, setCurrentWeather] = useState();

    // Forcast Weather API
    const [forcastWeatherApiSuccess, setForcastWeatherApiSuccess] = useState()
    const [forcastWeather, setForcastWeather] = useState();

    // Error and loading handling
    const [errorMessage, setErrorMessage] = useState([]);
    const [loadingErrorState, setLoadingErrorState] = useState();

    // fetch request for Weather API returned JSON, state set for successfull request and state set for input area closed 
    const allWeatherApi = () => {

        const currentWeatherApi = () => {
            
            let postcodeUrlfragment = postcode;
            postcodeUrlfragment = postcodeUrlfragment.toLowerCase().replace(' ', '');
            return (
            fetch('https://api.weatherbit.io/v2.0/current?&postal_code=' + postcodeUrlfragment + '&country=UK&key=ee3e0148f4364aef87bd19f76b49e6df', {
                method: 'GET'
            })
            .then(response => {
                if(response.status === 200){ 
                    setCurrentWeatherApiSuccess(true); 
                    console.log('Weather: Current Request Successfull')            
                    return response.json();
                } else { 
                    setCurrentWeatherApiSuccess(false);
                    throw new Error(
                        'HTTP Status: ' + response.status
                    );
                }      
            })
            .then(data => {
                
                const currentWeatherObj = {
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
                };
                setCurrentWeather(currentWeatherObj)
                
                //return currentWeatherObj;
            })
            .catch( error => {           
                setPostcode();
                setCurrentWeather();
                alert(error);
                setErrorMessage(prev => prev[0] = error)
            }))
            
        };

        const forcastWeatherApi = () => {
            let postcodeUrlfragment = postcode;
            postcodeUrlfragment = postcodeUrlfragment.toLowerCase().replace(' ', '');
            
            return (
            fetch('https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=' + postcodeUrlfragment +'&country=UK&key=ee3e0148f4364aef87bd19f76b49e6df', {
                method: 'GET'
            })
            .then(response => {
                if(response.status === 200){ 
                    setForcastWeatherApiSuccess(true); 
                    console.log('Weather: Forcast Request Successfull')            
                    return response.json();
                } else { 
                    setForcastWeatherApiSuccess(false);
                    throw new Error(
                        'HTTP Status: '  + response.status 
                        
                    );
                }      
            })
            .then(data => {
                
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

                //return {forcastWeatherObject}
            })
            .catch( error => {           
                setPostcode();
                setForcastWeather();
                alert(error);
                setErrorMessage(prev => prev[1] = error)
            }))
        };

        forcastWeatherApi()
        currentWeatherApi()
        //const saveWeatherResulsToLocalStorage = async () => {
        //    const currentWeatherResults = await currentWeatherApi()
        //    const forcastWeatherResults = await forcastWeatherApi()

        //    if(currentWeatherResults && forcastWeatherResults){
        //        localStorage.setItem('weather', JSON.stringify({timeSaved: Date.now(), postcode: postcode, currentWeather: currentWeatherResults, forcastWeather: forcastWeatherResults}));
        //    }
        //}
        //saveWeatherResulsToLocalStorage();
    }


    //retirieve postcode from localStorage and set postcode to state 
    if(!postcode){
        let postcodeStored = JSON.parse( localStorage.getItem('postcode') );
        if(postcodeStored !== null){
            setPostcode(postcodeStored);
        }
    }
    
    // Set states with weather data
    useEffect(() => {
        // only run code block if postcode input form is closed, and postcode has a value
        if(postcode && !weatherInputOpen){
            allWeatherApi();
            //let weatherStored = localStorage.getItem('weather');
            //if( weatherStored !== null ){
            //    let weatherParsed = JSON.parse(weatherStored);
            //    // if localStorage weather data is less than 15 minutes old, no need to call apis 
            //    if((Date.now() - weatherParsed.timeSaved) < (900000) && postcode === weatherParsed.postcode){
            //        setForcastWeather(weatherParsed.forcastWeather);
            //        setCurrentWeather(weatherParsed.currentWeather)
            //    } else {
            //        allWeatherApi();
            //    }
            //} else {
            //    allWeatherApi();
            //};
        };
    }, [postcode])

    // if there is no postcode stored, open postcode input form 
    if(postcode === null && weatherInputOpen === false){
        setWeatherInputOpen(true);
    }
    
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

    //handle Load time, show message after 5 seconds
    const loadingTimeExpired = () => {
        console.log(errorMessage);

        if(!(currentWeather && forcastWeather )){
            setLoadingErrorState(
                <div className={styles.error_message_container}>
                        <div className={styles.retry_api}>
                            <IoMdRefresh  onClick={() => setWeatherInputOpen(true)}/>
                        </div>     
                        <div>
                            <h2>Weather API not successfull</h2>
                            <h2>{errorMessage[0]}</h2>
                            <h2>{errorMessage[1]}</h2>
                            <h5>Please ensure you have entered the correct postcode</h5>
                        </div>         
                </div>
            )
        }
    }
    
    useEffect(() => {
        setLoadingErrorState(                
            <div className={`${styles.is_loading}`} >
                <div className={styles.loading_ring_container} >
                    <div className={styles.loading_ring} >
                    </div>
                </div>
            </div> 
        );

        let loadingTime = setTimeout(() => {
            loadingTimeExpired();
        }, 5000);

        return () => clearTimeout(loadingTime);
    }, [])

    // Output Value
    return (
        <section className={`${styles.weather} ${styles.component}`}>
            
            {weatherInputOpen ? (

                <div className={styles.postcode_input_container} >
                    <form >
                        <BsThreeDots className={styles.edit_icon} onClick={() => setWeatherInputOpen(false)}/>
                        <label htmlFor="postcode" >What is your Postcode? </label>
                        <div className={styles.input_button_container}>
                            <input type="text" name="postcode" value={postcode} onChange={inputChange} pattern="[a-zA-Z0-9]" minLength="4" maxLength="8" required/>
                            <button onClick={submitPostcode}>Submit</button>
                        </div>
                    </form>
                </div>

            ) : (
                <>
                    {(currentWeather && forcastWeather ) ? 
                        ( 
                        <div className={`${(currentWeather && forcastWeather ) ? styles.container_for_opacity_change_on_loaded : styles.container_for_opacity_change_on_loading}`} > 
                            <WeatherDisplay forcastWeather={forcastWeather} currentWeather={currentWeather} postcode={postcode} setWeatherInputOpen={setWeatherInputOpen} key={'weatherDisplay'}/> 
                        </div>
                        ) : (
                        loadingErrorState
                    )}
    
                </>
            )}
        </section>
    )
}

export default Weather;