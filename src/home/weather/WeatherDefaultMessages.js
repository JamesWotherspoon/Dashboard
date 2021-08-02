import React from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { IoIosArrowRoundBack } from 'react-icons/io';
import styles from './WeatherApi.module.scss';

const WeatherDefaultMessages = ({statusOfWeatherApi, togglePostcodeInput, errorMessage, retryFetch}) => {

    const renderSwitchStatus = (status) => {
        switch(status) {
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
                        <IoMdRefresh className={styles.retry_api_icon} onClick={retryFetch}/>
                        <IoIosArrowRoundBack className={styles.retry_api_icon} onClick={togglePostcodeInput}/>
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
                        <IoIosArrowRoundBack onClick={togglePostcodeInput}/>
                    </div>
                )
            default: 
                return (
                    <div className={styles.default_handling_container}>
                        <h2>Error with statusOfWeatherApi</h2>
                        <h2>This issue will be resolved as soon as possible</h2>
                        <IoIosArrowRoundBack onClick={togglePostcodeInput}/>
                    </div>
                )
        };
    };

    return renderSwitchStatus(statusOfWeatherApi)
}

export default WeatherDefaultMessages;