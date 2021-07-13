import React from 'react'
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
                    <div>
                        <p>Date: {element[i].date}</p>
                        <p>Event: {element[i].title}</p>
                        <p>Location: {element[i].location}</p>
                        <p>Time: {element[i].startTime} - {element[i].endTime}</p>
                    </div>
                )
            }
            
            return eventsList;
        })
        
        return eventsDisplayed;
    }
    


    return (
        <section className={`${styles.upcoming_events} ${styles.component}`}>
            {retrieveEvents()}
        </section>
    )
}

export default UpcomingEvents;