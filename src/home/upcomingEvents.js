import React, { useState } from 'react'
import home_styles from './home.module.scss';
import styles from './upcomingEvents.module.scss';
import { IoClose } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import UpcomingEventsEdit from './upcomingEventForm';
import { v4 as uuidv4 } from 'uuid';


const UpcomingEvents = () => {
    const [tasks, setTasks] = useState()
    const [toggleForm, changeToggleForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState('');

    // if tasks State is empty, retrieve tasks from localStorage
    if(!tasks){
        let taskObj = {};
        // retrieve tasks from next 14 days
        for(let i=0; i < 14; i++){
            let date = new Date();
            date.setDate(date.getDate() + i);
            date = date.toLocaleDateString('en-GB');
            
            let tasksStored = localStorage.getItem(date);
            //if task retrieved from localStorage add to TaskObj 
            if(tasksStored !== null){
                tasksStored = JSON.parse( tasksStored )
                taskObj = {...taskObj, [date]: tasksStored } ;  
            }
        }
        // set all tasks retreieved to tasks state
        setTasks(taskObj)
    }
    // handle adding tasks to tasks state 
    const addTask = (eventToAdd) => {
        // if a task for that date already exists push to existing tasks 
        if(tasks[eventToAdd.date]){
            setTasks(prev => {
                let cloneArray = prev[eventToAdd.date];
                cloneArray.push(eventToAdd)
                return {...prev,  [eventToAdd.date]: cloneArray}
            });
        } else {
            // if no task for that day exists create new property in tasks state
            setTasks(prev => {
                return {...prev, [eventToAdd.date]: [eventToAdd]}
            })
        }
    }

    const editTask = (taskToEditPara) => {
        //open form inputs
        changeToggleForm(prev => !prev);
        // pass task to edit, down to child
        setTaskToEdit(taskToEditPara);
    }

    // deleting selected task from tasks state and localStorage
    const deleteTask = (element) => {
        let eventsStoredForDate = JSON.parse( localStorage.getItem(element.date) );
        if(eventsStoredForDate.length > 1){
            eventsStoredForDate = eventsStoredForDate.filter(x => x.title !== element.title)
            localStorage.setItem(element.date, JSON.stringify(eventsStoredForDate));
            setTasks(prev => {
                return {...prev, [element.date]: eventsStoredForDate}
            })
        } else {
            localStorage.removeItem(element.date)
            let tempEvents = {...tasks};
            delete tempEvents[element.date];
            setTasks(tempEvents)
        }
    }

    const callToggleForm = () => {
        if(toggleForm){
            setTaskToEdit('')
        }
        changeToggleForm(prev => !prev)
    }

    const retrieveEvents = () => {
        
        if(tasks){
            let eventsDisplayed = () => {
                let eventsList = [];
                let tasksArray = [];
                // converting tasks to array to order dates 
                for(const element in tasks){
                    tasksArray.push(tasks[element]);
                };
                tasksArray.sort((a, b) => {

                    let dateA = Date.parse(a[0].inputDate);
                    console.log(dateA);
                    let dateB = Date.parse(b[0].inputDate);
                    if ( dateA < dateB ){
                        return -1;
                    }
                    if ( dateA > dateB ){
                        return 1;
                    }
                    return 0;
                });

                tasksArray.forEach(element  => {
                    // ordering tasks by start time
                    element.sort(( a, b ) => {
                        if ( a.startTime < b.startTime ){
                          return -1;
                        }
                        if ( a.startTime > b.startTime ){
                          return 1;
                        }
                        return 0;
                    });
                    
                    for(let i = 0; i < element.length; i++){

                        eventsList.push(
                            <div className={styles.upcoming_event_container} key={uuidv4()}>
                                {(i === 0) ? <h4 className={styles.date}>{element[i].date}</h4> : null}
                                <div className={styles.upcoming_event_details} >
                                    <div className={styles.event_icons} >
                                        <AiOutlineEdit className={styles.event_edit_icon} onClick={() => editTask(element[i])}/>
                                        <IoClose className={styles.event_close_icon} onClick={() => deleteTask(element[i])}/>
                                    </div>
                                    <h6 className={styles.event_title} >{element[i].title}</h6>
                                    <p className={styles.event_location} >{element[i].location}</p>
                                    <p className={styles.event_time} >{element[i].startTime} - {element[i].endTime}</p>
                                </div>
                            </div>
                        );
                    }
                })
                return eventsList;
            }
            return eventsDisplayed();
        }
    }
    


    return (
        <section className={`${home_styles.upcoming_events} ${styles.upcoming_events} ${home_styles.component}`}>
            <div className={styles.component_title}>
                <h3>Reminders</h3> 
                <MdAdd onClick={ () => callToggleForm()}/>
            </div>
            {toggleForm ? (
                <UpcomingEventsEdit callToggleForm={callToggleForm} deleteTask={deleteTask} addTask={addTask} taskToEdit={taskToEdit} />
            ) : retrieveEvents()}
        </section>
    )
}

export default UpcomingEvents