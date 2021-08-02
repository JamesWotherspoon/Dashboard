import React from 'react';
import home from '../home.module.scss';
import styles from './displayDate.module.scss';

const DisplayDate = () => {
    const currentDate = new Date();
    const dateToString = currentDate.toDateString();
    let [ day, month, date, ] = dateToString.split(' ');
    date = Number(date);

    return (
        <section className={`${home.display_date} ${styles.display_date}`} >
            <div className={styles.top_decoration_container}>
                <div className={styles.ring_holes} >
                    <div className={styles.ring_binders} >

                    </div>
                </div>
                <div className={styles.ring_holes} >
                    <div className={styles.ring_binders} >

                    </div>
                </div>
            </div>
            <h2>{day}</h2>
            <h3>{date} {month}</h3>
        </section>
    );
}

export default DisplayDate;