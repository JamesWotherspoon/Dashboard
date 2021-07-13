import React from 'react';
import styles from './home.module.scss';

const Greeting = () => {
    const currentDate = new Date();
    let hour = currentDate.getHours();
    let greeting;
    if(hour < 12 ){
        greeting = 'Good Morning'
    } else if(hour < 18 ){
        greeting = 'Good Afternoon'
    } else if(hour < 24 ){
        greeting = 'Good Evening'
    } else {
        greeting = 'Hello'
    };
    let name = 'James';

    return (
        <section className={`${styles.greeting} ${styles.component}`}>
                <h2>{greeting}, {name}!</h2>
        </section> 
        
    );
}

export default Greeting;