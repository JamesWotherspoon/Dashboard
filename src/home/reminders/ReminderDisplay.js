import React from 'react';
import styles from './Reminders.module.scss';
import { IoClose } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';

export default function ReminderDisplay({ remindersList, editReminder, deleteReminder, callToggleForm }) {

    let remindersArray = [];

    remindersList.forEach((reminder, index, reminderListArray)  => {
        let dateFormatted = new Date(Date.parse(reminder.date)).toLocaleDateString('en-GB');
        const displayNewDate = (index === 0 || reminder.date !== reminderListArray[index - 1].date) ? dateFormatted : null;

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
        
    return (
        <div className={styles.display_reminder_scroll_container}>
            <div className={styles.reminder_list_container}>
                {remindersArray}
            </div>
            <div className={`${styles.add_reminder_container} ${remindersArray.length ? styles.button_at_top : null}`}>
                {(remindersArray.length) ? 
                    null : (
                    <h5 className={styles.no_reminder_set}>
                        No reminders currently set
                    </h5> 
                )}
                <div onClick={callToggleForm} className={styles.add_reminder_button} >
                    <IoClose className={styles.add_icon} />
                    <p>Add</p>
                </div>
            </div>
        </div>
    )
}
