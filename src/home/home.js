import React from 'react';
import Greeting from './greeting';
import SearchBar from './searchBar';
import DisplayDate from './displayDate';
import Weather from './weather';
import styles from './home.module.scss';
import Shortcuts from './shortcuts';
import UpcomingEvents from './upcomingEvents';
import NewsApi from './newsApi';

const home = () => {
    return (
        <div className={styles.home}>
            <Greeting />
            <SearchBar />
            <DisplayDate /> 
            <Weather />
            <Shortcuts />
            <UpcomingEvents />
            <NewsApi />
            
        </div> 
    )
}

export default home;