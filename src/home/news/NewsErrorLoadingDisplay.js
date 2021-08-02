import React from 'react';
import styles from './NewsApi.module.scss';
import { IoMdRefresh } from 'react-icons/io';

const NewsErrorLoadingDisplay = ({ errorMessage, retryFetchNews, isLoading}) => {

    return (
        <div>
            {isLoading ? (    
                <div className={`${styles.is_loading}`} >
                    <div className={styles.loading_ring_container} >
                        <div className={styles.loading_ring} >
                        </div>
                    </div>
                </div> 
            ) : (
                <div className={styles.error_message_container} >
                    <div className={styles.retry_api}>
                        <IoMdRefresh  onClick={() => retryFetchNews()}/>
                    </div>     
                    <div>
                        <h2>News API not successfull. </h2>
                        <h2>{errorMessage}</h2>
                    </div>         
                </div>
            )}            
        </div>
    )
}

export default NewsErrorLoadingDisplay;