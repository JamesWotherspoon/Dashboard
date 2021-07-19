import React from 'react';

import SearchBar from './searchBar';
import DisplayDate from './displayDate';
import Weather from './weather';
import styles from './home.module.scss';
import Shortcuts from './shortcuts';
import UpcomingEvents from './upcomingEvents';
import NewsApi from './newsApi';
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