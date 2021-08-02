import React, { useEffect, useState, useRef} from 'react';

import { BiAddToQueue } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import styles from './calender.module.scss';


const DayPlanner = ({ selectedDate, taskChange, openTaskTab }) => {
    const [taskTab, setTaskTab] = useState(false)
    const [task, setTask] = useState({
        date: selectedDate,
        title: '',
        location: '',
        startTime: '12:00',
        endTime: '13:00',
        edit: {
            boolean: false,
            index: null
        }
    });
    const firstRender = useRef(true);

    // Open scrolled to 9 am on time of day planner
    const timeOfDayContainer = useRef();
    useEffect(()=>{
        if(!taskTab){
            timeOfDayContainer.current.scrollTop = '580';
        }  
    }); 

    // reset the task set in state
    const resetTaskState = () => {
        setTask({
            date: selectedDate,
            title: '',
            location: '',
            startTime: '12:00',
            endTime: '13:00',
            edit: {
                boolean: false,
                index: null
            }
        })
    }

    // reset task state and close task tab when another date is selected
    useEffect(() => {
        setTaskTab(false);
        resetTaskState();
    }, [selectedDate]);

    // open Task tab when props.openTaskTab changes, does not open task tab on inital render
    useEffect(()=> {
        if(!firstRender.current){
            setTaskTab(true);
        };
        firstRender.current = false; 
    }, [openTaskTab]);

    // reset task state when task tab closes
    useEffect(() => {
        if(!taskTab){
            resetTaskState();
        }
    }, [taskTab]);

    // Calculate the difference between start and end time
    const timeDifference  = (start, end) => {
        let endTime = end.split(':');
        let startTime = start.split(':');
        let hourDifference = (Number(endTime[0]) - Number(startTime[0]))*60;
        let overallDifference = hourDifference + (endTime[1] - startTime[1]);
        return overallDifference
    }


    const editTask = (index) => {

        setTaskTab(true);
        
        let taskToEdit = JSON.parse( localStorage.getItem( selectedDate ) )[index];
        
        setTask(taskToEdit, taskToEdit.edit.boolean = true, taskToEdit.edit.index = index);
    };

    const deleteTask = (dateKey, index) => {
        
        let taskArray = JSON.parse( localStorage.getItem( dateKey ) );

        taskArray.splice(index, 1);

        if(taskArray.length > 0){
            localStorage.setItem( dateKey, JSON.stringify( taskArray ) );
        } else {
            localStorage.removeItem(dateKey);
        };
        
        resetTaskState();
        setTaskTab(false);
        taskChange();
    };

    let timeOfDay = [];
    for(let i=0; i <= 24; i++){

        let hour = (i<10) ? `0${i}` : `${i}`;
        timeOfDay.push(<div id={`time_${i}`} className={styles.time_lines}  > {hour}:00 <hr /></div>);
    };
    
    const taskObject = JSON.parse( localStorage.getItem( selectedDate ) );

    const tasksForDay = [];
    
    if(taskObject !== null ){
        let counter = 0;
        for(let i=0; i < taskObject.length; i++){
            
            const gridRow = (time) => {
                const [hour, minutes] = time.split(':');
                return (hour*4 + Math.round(minutes/15) + 1)
            };

            const gridRowStart = gridRow(taskObject[i].startTime);
            const gridRowEnd = gridRow(taskObject[i].endTime);
            let gridColStart = 1;
            let gridColEnd = 4;
            if( i > 1 ){
                if((taskObject[i].startTime >= taskObject[i - 1].startTime)&&(taskObject[i].startTime <= taskObject[i - 1].endTime)){
                    counter += 1;
                    gridColStart = 1 + counter;
                    gridColEnd = 2 + counter;
                }
                
                if((taskObject[i].startTime <= taskObject[i - 1].startTime)&&(taskObject[i].endTime >= taskObject[i - 1].startTime)){
                    counter += 1;
                    gridColStart = 1 + counter;
                    gridColEnd = 2 + counter;
                }
            }

            const taskStyles = {
                gridArea: `${gridRowStart} / 1 / ${gridRowEnd} / 4`
            };

            const overallDifference = timeDifference(taskObject[i].startTime, taskObject[i].endTime);
            
            tasksForDay.push(
                <div className={styles.task_on_day_planner} style={taskStyles}>
                    <BsThreeDots className={styles.edit_icon} onClick={() => editTask(i)} />
                    <MdDeleteForever  className={styles.delete_icon} onClick={() => deleteTask(taskObject[i].date, i)} />
                    <p>{taskObject[i].title}</p>
                    {(taskObject[i].location.length > 0 && overallDifference > 30) ? <p>{taskObject[i].location}</p> : null }
                    {overallDifference > 60 ? <p className={styles.time_of_event}>{taskObject[i].startTime}-{taskObject[i].endTime}</p> : null }                   
                </div>);
        }
    };


    useEffect(()=>{
        setTask(prev => ( { ...prev, date: selectedDate} ) );
    }, [selectedDate]);

    const handleInputChange = (event) => {
        setTask(prev => ( { ...prev,  [event.target.name]: event.target.value } ) );  
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        if(timeDifference(task.startTime, task.endTime) < 0){
            alert('Please set the finish time after the start time');
            return;
        }

        let storedTasks = JSON.parse( localStorage.getItem( selectedDate ) );

        if(task.edit.boolean){
            storedTasks.splice(task.edit.index, 1);
            setTask(task, task.edit.boolean = false, task.edit.index = null);
        }
        
        if(storedTasks !== null){
            storedTasks.push(task);
            storedTasks = JSON.stringify(storedTasks);
            localStorage.setItem(selectedDate, storedTasks); 
        } else {
            let taskArray = [task];
            const taskToStorage = JSON.stringify(taskArray);
            localStorage.setItem(selectedDate, taskToStorage); 
        }

        resetTaskState();
        setTaskTab(false);
        taskChange();
    };

    return (
        <aside className={styles.day_planner}>
            {taskTab ? (
                <>
                    <div className={styles.task_tab}>
                        <IoClose className={styles.close_taskTab_Icon} onClick={() => setTaskTab(false) } />
                        <form autoComplete="off" onSubmit={onFormSubmit} >
    
                            <input name="date" readOnly="readonly" value={selectedDate} />
                            <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleInputChange} required/>
                            <input type="text" name="location" placeholder="Location" value={task.location} onChange={handleInputChange}/>
                            <br />
                            <input id="starts" name="startTime" type="time" value={task.startTime} onChange={handleInputChange}/>
                            <span > to </span>
                            <input id="end" name="endTime" type="time" value={task.endTime} onChange={handleInputChange}/>
                            <br />
                            <button type="submit">{(task.edit.boolean) ? ('Edit Event'):('Add Event')}</button>
                            {(task.edit.boolean) ? ( <button type="button" onClick={() => deleteTask(task.date, task.edit.index) }>Delete</button> ) :  ( null ) }
                        </form>
                    </div>
                </>
            ):(
                <>
                    <h2>{selectedDate}</h2>
                    <div ref={timeOfDayContainer} className={styles.time_of_day} >
                        {timeOfDay}
                        <div className={styles.tasks_on_day_planner_container}>
                            {tasksForDay}
                        </div>                    
                    </div>

                    
                    <button onClick={() => setTaskTab(true) } className={styles.day_planner_add_task}>
                        <span>Add Task </span>
                        <BiAddToQueue id="add-task" />
                    </button>
                    

                </>
           )} 
            
        </aside>
    );
};

export default DayPlanner;