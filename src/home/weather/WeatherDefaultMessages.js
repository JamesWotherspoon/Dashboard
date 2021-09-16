import React from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { IoIosArrowRoundBack } from 'react-icons/io';
import loading from '../apiLoading.module.scss';
import styles from './WeatherApi.module.scss';


const WeatherDefaultMessages = ({statusOfWeatherApi, togglePostcodeInput, errorMessage, retryFetch}) => {

    const renderSwitchStatus = (status) => {
        switch(status) {
            case 'loading':
                return (
                    <div className={`${loading.is_loading}`} >
                        <div className={loading.loading_ring_container} >
                            <div className={loading.loading_ring} >
                            </div>
                        </div>
                    </div> 
            );
            case 'error':
                return ( 
                    <div className={styles.error_message_container}>
                            <h2>{errorMessage}</h2>
                            <div className={styles.error_icon_container}>
                                <IoIosArrowRoundBack className={styles.error_back_icon} onClick={togglePostcodeInput}/>
                                <IoMdRefresh className={styles.retry_icon} onClick={retryFetch}/>
                            </div>
                            <h5>Please ensure you have entered the correct postcode</h5>       
                    </div>
                );
            case 'noPostcodeParameterSubmitted':
                return (
                    <div className={styles.default_handling_container}>
                        <h2>Please submit a postcode</h2>
                        <IoIosArrowRoundBack className={styles.error_back_icon} onClick={togglePostcodeInput}/>
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