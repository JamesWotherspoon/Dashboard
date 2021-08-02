import React from 'react';
import styles from './Reminders.module.scss';
import { IoClose } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';

export default function ReminderDisplay({ remindersList, editReminder, deleteReminder }) {

    let remindersArray = [];

    remindersList.forEach((reminder, index, reminderListArray)  => {
        const displayNewDate = (index === 0 || reminder.date !== reminderListArray[index - 1].date) ? reminder.date : null;

        remindersArray.push(
            <div className={styles.upcoming_event_container} key={reminder.key}>             
                <h4 className={styles.date}>{displayNewDate}</h4> 
                <div className={styles.upcoming_event_details} >
                    <div className={styles.event_icons} >
                        <AiOutlineEdit className={styles.event_edit_icon} onClick={() => editReminder(reminder.key)}/>
                        <IoClose className={styles.event_close_icon} onClick={() => deleteReminder(reminder.key)}/>
                    </div>
                    <h6 className={styles.event_title} >{reminder.title}</h6>
                    <p className={styles.event_location} >{reminder.location}</p>
                    <p className={styles.event_time} >{reminder.startTime} - {reminder.endTime}</p>
                </div>
            </div>
        )           
    })
        
    return remindersArray
}
