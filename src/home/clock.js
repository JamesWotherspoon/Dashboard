import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';

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

    return (
        <section className={styles.clock}>
            <h2 className={styles.time}>{time}</h2>
        </section>
    )
}

export default Clock;