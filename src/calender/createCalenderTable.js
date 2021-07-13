import React, { useEffect, useState, useRef } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import DayPlanner from './dayPlanner';
import styles from './calender.module.scss';


const CreateCalenderTable = ({ YearMonthInput, onCurrentMonth, previousMonth, nextMonth, children}) => {
    const [selected, setSelected] = useState(null);
    const [updateToStorage, setUpdateToStorage] = useState(false);
    const [openTaskTab, setOpenTaskTab] = useState(false);

    
   
    let currentDate = (new Date()).getDate();
    const [selectedYear, selectedMonth] = YearMonthInput.split('-');
    const lastDateOfSelectedMonth = new Date(selectedYear, selectedMonth, 0);
    const daysInSelectedMonth = lastDateOfSelectedMonth.getDate();
    let firstDayOfSelectedMonth = (new Date(selectedYear, selectedMonth - 1, 1)).getDay();
    firstDayOfSelectedMonth = (firstDayOfSelectedMonth === 0) ? 7 : firstDayOfSelectedMonth;
    const daysInPreviousMonth = new Date(selectedYear, selectedMonth -1, 0).getDate();


    const onSquareSelected = (dateNumber) => {
        setSelected(dateNumber);
    }

    const onOpenTaskTabSelected = () => {
        setOpenTaskTab(prev => !prev);
    }

    useEffect(()=> {        
        if (onCurrentMonth){
            setSelected(currentDate);           
        } else {
            setSelected(null);   
        }
    }, [onCurrentMonth, currentDate]);

    useEffect(() => {
        setSelected(null);
    }, [selectedMonth]);

    const dateInGbFormat = (date) => {
        return (new Date(selectedYear, selectedMonth - 1, (date) ? date : null )).toLocaleDateString('en-GB');
    }
    
    // Creating the table header
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const headerSquares = daysOfWeek.map((day) => {
        return <div className={`${styles.column_header} ${styles.calender_square}`} key={day}>{day}</div>
    });

    // Adding squares to represent the last days of the previous month 
    const calenderSquares = [];
    for(let i = 1; i < firstDayOfSelectedMonth; i++){
        let increment = i - 1;
        let id = `previous-month-ending${i}`;
        calenderSquares.unshift(  <div id={id} key={id} className={`${styles.not_current_month_squares} ${styles.calender_square}`}>{daysInPreviousMonth - increment}</div>)
    };
    if(firstDayOfSelectedMonth === 1){
        for(let i=0; i < 7; i++){
            let id = `previous-month-ending${i}`;
            calenderSquares.unshift( <div id={id} key={id} className={`${styles.not_current_month_squares} ${styles.calender_square}`}>{daysInPreviousMonth - i}</div>)
        }
    }
    
    // Creating the the calander squares for the month seleceted
    for(let i = 1; i <= daysInSelectedMonth; i++){

        const todaySelected = (onCurrentMonth && ( i === currentDate)) ? `${styles.today}` : null;
        let classActive = (selected === i) ? `${styles.active}` : null;

        let calenderSquareDate = dateInGbFormat(i);
        let taskStoredForDay = localStorage.getItem(calenderSquareDate);
        let taskOnDayMarker;

        if(taskStoredForDay !== null){
            taskOnDayMarker = <div className={styles.task_on_day_marker} onClick={()=>onSquareSelected(i)}></div>
        } else {
            taskOnDayMarker = null;
        }

        calenderSquares.push(  
            <div id={`_${i}`} key={`_${i}`} className={`${styles.current_month_squares} ${styles.calender_square} ${classActive} ${todaySelected}`} onClick={() => onSquareSelected(i)}>
                <div  className={` ${styles.inner_square}`}>
                    {i}
                    <BiAddToQueue className={styles.add_task_on_date_icon} onClick={() => onOpenTaskTabSelected()}/>
                    {taskOnDayMarker}
                </div>
            </div>);
    };
    
    // Adding squares for the first days of the next month
    let nextMonthBeginning = 0;
    while(calenderSquares.length !== 42){
        nextMonthBeginning++;
        let id = `next-month-beginning${nextMonthBeginning}`
        calenderSquares.push(<div id={id} key={id} className={`${styles.not_current_month_squares} ${styles.calender_square}`}>{nextMonthBeginning}</div>)
    }



    const taskChange = () => {
        setUpdateToStorage(prev => !prev);
    }
    let selectedDate = dateInGbFormat(selected);

    return (
        <>  
            <section className={styles.calender}>
                {children}
                <div className={styles.calender_table}>
                    <div className={styles.table_header}>
                        {headerSquares}
                    </div>
                    <div className={styles.calender_squares_container} >
                        {calenderSquares}
                    </div>

                </div>
            </section>
            { // {(selected) ? ( 
             } 
                <DayPlanner selectedDate={selectedDate} taskChange={taskChange} openTaskTab={openTaskTab}/>
            {// ) : ( null ) 
                }
        </>
    )
    
}

export default CreateCalenderTable;