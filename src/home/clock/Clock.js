import React, { useEffect, useState } from 'react';
import home from '../home.module.scss';
import styles from './clock.module.scss';

const Clock = () => {
    const [time, setTime] = useState();

    const updateTime = () => {
        let timeNow = (new Date()).toTimeString();
        timeNow = timeNow.slice(0, 5)
        setTime(timeNow)
    }
    
    useEffect(() => {

        updateTime();

        const checkTimeInterval = setInterval(() => updateTime(), 10000);

        return () => {
            clearInterval(checkTimeInterval);
        }

    }, []);

    // date
    const currentDate = new Date();
    const dateToString = currentDate.toDateString();

    let [ day, month, date, ] = dateToString.split(' ');
    let suffix;
    if(date[1] === '1'){
        suffix = 'st'
    } else if(date[1] === '2'){
        suffix = 'nd'
    } else if(date[1] === '3'){
        suffix = 'rd'
    } else {
        suffix = 'th'
    }
    date = Number(date);

    return (
        <section className={`${home.clock} ${styles.clock}`}>
            <h2 className={styles.time}>{time}</h2>
            <h3 className={styles.date_container} >{day} {date}<span className={styles.date_suffix}>{suffix}</span> {month}</h3>
        </section>
    )
}

export default Clock;