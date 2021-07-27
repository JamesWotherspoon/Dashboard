import React from 'react';

import SearchBar from './searchBar';
import DisplayDate from './displayDate';
import Weather from './weather/WeatherApi';
import styles from './home.module.scss';
import Shortcuts from './shortcuts/Shortcuts';
import UpcomingEvents from './upcomingEvents';
import NewsApi from './news/NewsApi';
import Clock from './clock';

const home = () => {
    return (
        <div className={styles.home}>
            <SearchBar />
            <DisplayDate /> 
            <Clock />
            <Weather />
            <Shortcuts />
            <UpcomingEvents />
            <NewsApi />
            
        </div> 
    )
}

export default home;