import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

const RemindersAddEdit = ({ remindersList, keyOfEdit, callToggleForm, deleteReminder, addReminder })  => {

    const [reminderInput, setReminderInput] = useState({
        date: (new Date()).toLocaleDateString('en-CA'),
        title: '',
        location: '',
        startTime: '12:00',
        endTime: '13:00',
        key: uuidv4()
    });

    useEffect(() => {
        if(keyOfEdit) setReminderInput(() => remindersList.filter(reminder => reminder.key === keyOfEdit)[0] )
    }, [keyOfEdit, remindersList])
    
    // Determining time difference between start and end time
    const timeDifference  = (start, end) => {
        let endTime = end.split(':');
        let startTime = start.split(':');
        let hourDifference = (Number(endTime[0]) - Number(startTime[0]))*60;
        let overallMinutesDifference = hourDifference + (endTime[1] - startTime[1]);
        return overallMinutesDifference
    }

    const handleInputChange = (event) => {
        setReminderInput(prev => ( { ...prev,  [event.target.name]: event.target.value } ) ); 
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        // Alert if start time is after end time
        if(timeDifference(reminderInput.startTime, reminderInput.endTime) < 0){
            alert('Please set the finish time after the start time');
            return
        }

        if(keyOfEdit) deleteReminder(keyOfEdit);
        addReminder(reminderInput);
    };

    return (
        <div >
            <IoClose  onClick={() =>  callToggleForm() } />
            <form autoComplete="off" onSubmit={onFormSubmit} >
                <input type="date" name="date" value={reminderInput.date} onChange={handleInputChange}/>
                <input type="text" name="title" placeholder="Title" value={reminderInput.title} onChange={handleInputChange} required/>
                <input type="text" name="location" placeholder="Location" value={reminderInput.location} onChange={handleInputChange}/>
                <br />
                <input id="starts" name="startTime" type="time" value={reminderInput.startTime} onChange={handleInputChange}/>
                <span > to </span>
                <input id="end" name="endTime" type="time" value={reminderInput.endTime} onChange={handleInputChange}/>
                <br />
                {(keyOfEdit) ? (
                    <>
                        <button type="submit" name="editButton" >Edit Event</button>
                        <button type="button" onClick={() => deleteReminder(keyOfEdit) }>Delete</button>
                    </>
                ):(
                    <button type="submit">Add Event</button>
                )}
            </form>
        </div>
    )
}

export default RemindersAddEdit;
