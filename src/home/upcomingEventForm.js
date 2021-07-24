import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';

const UpcomingEventForm = ({ deleteTask, callToggleForm, addTask, taskToEdit })  => {

    const [task, setTask] = useState({
        date: '',
        inputDate: '',
        title: '',
        location: '',
        startTime: '12:00',
        endTime: '13:00',
        edit: {
            boolean: false,
        }
    });

    const resetTaskState = () => {
        setTask({
            date: '',
            inputDate: '',
            title: '',
            location: '',
            startTime: '12:00',
            endTime: '13:00',
            edit: {
                boolean: false,
            }
        })
    }
    // Passing down task to edit
    useEffect(()=> {
        if(taskToEdit){
            taskToEdit.edit.boolean = true
            setTask(taskToEdit)
        }
    }, [taskToEdit])

    // intialize the current date
    let dateForLocalStorageKey = (new Date()).toLocaleDateString('en-GB');
    useEffect(() => {
        let [date, month, year] = dateForLocalStorageKey.split('/');
        setTask(prev => { return {...prev, inputDate: `${year}-${month}-${date}`}})
    }, [dateForLocalStorageKey])

    // Update dateForKeyFormat from inputDate
    useEffect(() => {
        let selectedDateForLocalStorageKey = (new Date(task.inputDate)).toLocaleDateString('en-GB');
        setTask(prev => {return {...prev, date: selectedDateForLocalStorageKey}})
    }, [task.inputDate])
    
    // Determining time difference between start and end time
    const timeDifference  = (start, end) => {
        let endTime = end.split(':');
        let startTime = start.split(':');
        let hourDifference = (Number(endTime[0]) - Number(startTime[0]))*60;
        let overallDifference = hourDifference + (endTime[1] - startTime[1]);
        return overallDifference
    }

    // Handle input chnages and saved values to state
    const handleInputChange = (event) => {
        setTask(prev => ( { ...prev,  [event.target.name]: event.target.value } ) ); 
    };

    // Handle form submit
    const onFormSubmit = (event) => {
        event.preventDefault();
        // Alert if start time is after end time
        if(timeDifference(task.startTime, task.endTime) < 0){
            alert('Please set the finish time after the start time');
            return;
        }
        // Check if a task is already stored for the selected date
        let storedTasks = JSON.parse( localStorage.getItem( task.date ) );
        
        // if a task is already saved for that date add task to existing array and save to localStorage with date as key
        if(storedTasks !== null){
            storedTasks.push(task);
            storedTasks = JSON.stringify(storedTasks);
            localStorage.setItem(task.date, storedTasks); 
        } else {
            // if no task is saved for that date, just save task to localStorage with date as key
            let taskArray = [task];
            const taskToStorage = JSON.stringify(taskArray);
            localStorage.setItem(task.date, taskToStorage); 
        }
        // passing up task to parent state to display
        addTask(task);
        // close form 
        callToggleForm();
        // reset form inputs
        resetTaskState();
    };

    const deleteEdit = () => {
        deleteTask(taskToEdit);
        callToggleForm();
    }
    const editEdit = () => {
        deleteTask(taskToEdit)
    }

    return (
        <div >
            <IoClose  onClick={() =>  callToggleForm() } />
            <form autoComplete="off" onSubmit={onFormSubmit} >

                <input type="date" name="inputDate" value={task.inputDate} onChange={handleInputChange}/>
                <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleInputChange} required/>
                <input type="text" name="location" placeholder="Location" value={task.location} onChange={handleInputChange}/>
                <br />
                <input id="starts" name="startTime" type="time" value={task.startTime} onChange={handleInputChange}/>
                <span > to </span>
                <input id="end" name="endTime" type="time" value={task.endTime} onChange={handleInputChange}/>
                <br />
                {(task.edit.boolean) ? (<button type="submit" onClick={() => editEdit()}>Edit Event</button>):(<button type="submit">Add Event</button>)}
                {(task.edit.boolean) ? ( <button type="button" onClick={() => deleteEdit() }>Delete</button> ) :  ( null ) }

            </form>
        </div>
    )
}

export default UpcomingEventForm;
