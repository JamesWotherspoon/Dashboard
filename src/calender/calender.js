import React, { useEffect, useState, useReducer } from 'react';
import styles from './calender.module.scss';
import CreateCalenderTable from './createCalenderTable';
import { VscFoldUp } from 'react-icons/vsc';
import { VscFoldDown } from 'react-icons/vsc';


const ACTION = {
    INCREASE_MONTH: 'increase-month',
    DECREASE_MONTH: 'decrease-month',
    SET_MONTH: 'set-month'  
}

const calenderInputString = (year, month) => {
    month = (month < 10 ) ? (month = '0' + month) : month;
    return `${year}-${month}`
}

const currentMonth = () => {
    let date = new Date();
    const year = Number(date.getFullYear());
    let month = Number(date.getMonth() + 1);
    return{ selectedDate: calenderInputString(year, month), selectedMonth: month, selectedYear: year };
}

const reducer = (state, action) => {
    
    switch(action.type){
        case ACTION.INCREASE_MONTH:
            if(state.selectedMonth === 12){

                return {selectedDate: calenderInputString(state.selectedYear + 1, 1), selectedMonth: 1, selectedYear: state.selectedYear + 1};
            };
            return {...state, selectedDate: calenderInputString(state.selectedYear, state.selectedMonth + 1), selectedMonth: state.selectedMonth + 1 };
        case ACTION.DECREASE_MONTH:
            if(state.selectedMonth === 1){
                return {selectedDate: calenderInputString(state.selectedYear - 1, 12), selectedMonth: 12, selectedYear: state.selectedYear - 1};
            };            
            return {...state, selectedDate: calenderInputString(state.selectedYear, state.selectedMonth - 1), selectedMonth: state.selectedMonth - 1 };
        case ACTION.SET_MONTH:
            action.payload.selectedDate.slice(0, 4)
            return {selectedDate: action.payload.selectedDate, selectedYear: action.payload.selectedDate.slice(0, 4), selectedMonth: action.payload.selectedDate.slice(5, 7)};
        default: 
            return state  
    }
}


const Calender = () => {
    const [state, dispatch] = useReducer(reducer, { selectedDate: '', selectedMonth: 0, selectedYear: 0 }, currentMonth);

    const [selectedDate, setSelectedDate] = useState(currentMonth().selectedDate);
    const [onCurrentMonth, setOnCurrentMonth] = useState(true);


    const previousMonth = () => {      
        dispatch({type: ACTION.DECREASE_MONTH})
    };

    const nextMonth = () => {
        dispatch({type: ACTION.INCREASE_MONTH})
    };
    
    const onMonthChange = (event) => { 
        dispatch({type: ACTION.SET_MONTH, payload: {selectedDate: event.target.value}});
    };

    useEffect(() => {
        setSelectedDate(state.selectedDate );
    }, [state.selectedDate]);

    useEffect(() => {
        (currentMonth().selectedDate === selectedDate) ? setOnCurrentMonth(true) : setOnCurrentMonth(false);
    }, [ selectedDate]);

    

    return (
        <div className={styles.calendar_tab_container} >

            <CreateCalenderTable 
                YearMonthInput={state.selectedDate} 
                onCurrentMonth={onCurrentMonth} 
                previousMonth={previousMonth} 
                nextMonth={nextMonth} >
                <header>
                    <form className={styles.date_selector}>
                        <input className={styles.date_selector_input} type="month" value={selectedDate} onChange={onMonthChange} /> 
                    </form>
                    <div className={styles.nav_arrows_container}>
                        <VscFoldUp className={styles.nav_arrows} onClick={previousMonth}/>
                        <VscFoldDown className={styles.nav_arrows} onClick={nextMonth}/>
                    </div>
                </header>
            </CreateCalenderTable >

        </div>
    );
};

export default Calender; 