import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';

const Clock = () => {
    const [time, setTime] = useState(() => {
        let date = new Date();
        return `${date.getHours()}:${(date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()}`
    });

    const tick = () => {
        let date = new Date();

        setTime(() => `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}` );
    };

    useEffect(() => {
        const tickInterval = setInterval(() => tick(), 60000);
        return () => {
            clearInterval(tickInterval);
        }
    });

    return (
        <section className={styles.clock}>
            <h2 className={styles.time}>{time}</h2>
        </section>
    )
}

export default Clock;