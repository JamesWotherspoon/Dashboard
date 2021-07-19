import React from 'react'
import home_styles from './home.module.scss';
import styles from './upcomingEvents.module.scss';

const UpcomingEvents = () => {

    const retrieveEvents = () => {
        let eventArray = [];
        for(let i=0; i < 14; i++){
            let date = new Date();
            date.setDate(date.getDate() + i);
            date = date.toLocaleDateString('en-GB');
            
            let eventStored = localStorage.getItem(date);

            if(eventStored !== null){
                eventStored = JSON.parse(eventStored);
                eventArray.push(eventStored);
            } 
        }

        let eventsDisplayed = eventArray.map(element => {
            let eventsList = [];
            for(let i = 0; i < element.length; i++){
                eventsList.push(
                    <div className={styles.upcoming_event_container}>
                        <h4 className={styles.date}>{element[i].date}</h4>
                        <div className={styles.upcoming_event_details} >
                            <h6 className={styles.event_title} >{element[i].title}</h6>
                            <p className={styles.event_location} >{element[i].location}</p>
                            <p className={styles.event_time} >{element[i].startTime} - {element[i].endTime}</p>
                               
                        </div>
                    </div>
                )
            }
            
            return eventsList;
        })
        
        return eventsDisplayed;
    }
    


    return (
        <section className={`${home_styles.upcoming_events} ${styles.upcoming_events} ${home_styles.component}`}>
            <div className={styles.component_title}>
                <h3>Reminders</h3>
            </div>
            {retrieveEvents()}
        </section>
    )
}

export default UpcomingEvents;