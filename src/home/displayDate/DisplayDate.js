import React from 'react';
import home from '../home.module.scss';
import styles from './displayDate.module.scss';

const DisplayDate = () => {
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
            <div className={styles.date_container}>
                <h2 className={styles.date_day}>{day}</h2>
                <h3 className={styles.date_date_month} >{date}<span className={styles.date_suffix}>{suffix}</span> {month}</h3>
            </div>
        </section>
    );
}

export default DisplayDate;