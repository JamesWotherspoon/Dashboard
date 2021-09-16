import React from 'react';
import loading from '../apiLoading.module.scss';
import styles from './NewsApi.module.scss';
import { IoMdRefresh } from 'react-icons/io';

const NewsErrorLoadingDisplay = ({ errorMessage, retryFetchNews, isLoading }) => {

    return (
        <>
            {isLoading ? (    
                <div className={`${loading.is_loading}`} >
                    <div className={loading.loading_ring_container} >
                        <div className={loading.loading_ring} >
                        </div>
                    </div>
                </div> 
            ) : (
                <div className={styles.error_message_container} >
                    <h2>{errorMessage}</h2>
                    <IoMdRefresh  onClick={() => retryFetchNews()}/>
                </div>
            )}            
        </>
    )
}

export default NewsErrorLoadingDisplay;