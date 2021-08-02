import React from 'react';

import SearchBar from './searchBar/SearchBar';
import DisplayDate from './displayDate/DisplayDate';
import Weather from './weather/WeatherApi';
import styles from './home.module.scss';
import Shortcuts from './shortcuts/Shortcuts';
import Reminders from './reminders/Reminders';
import NewsApi from './news/NewsApi';
import Clock from './clock/Clock';

const home = () => {
    return (
        <div className={styles.home}>
            <SearchBar />
            <DisplayDate /> 
            <Clock />
            <Weather />
            <Shortcuts />
            <Reminders />
            <NewsApi />            
        </div> 
    )
}

export default home;