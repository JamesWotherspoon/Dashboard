import React, { useState, useEffect, useRef } from 'react';
import { TiTick } from 'react-icons/ti';
import { BsThreeDots } from 'react-icons/bs';
import SleepCircleDisplay from './sleepCircleDisplay';

const DisplaySleepData = () => {
    let sleepTarget = localStorage.getItem('sleepTarget');
    sleepTarget = JSON.parse(sleepTarget);
    let fellAsleepDefault = '10:00';
    let wakeTimeDefault = '08:00';

    if(sleepTarget !== null){
        fellAsleepDefault = sleepTarget.bedTime;
        wakeTimeDefault = sleepTarget.wakeTime;
    };

    let retrieveSleepData = localStorage.getItem('sleepData');
    retrieveSleepData = JSON.parse(retrieveSleepData);
    const retrieveSubmittedValue = (numberOfDaysAgo) => {
        if(retrieveSleepData !== null){
            let date = getRawDate(numberOfDaysAgo);
            if(retrieveSleepData[date] === undefined){
                return false
            }
            return retrieveSleepData[date].submitted;
        } else {
            return false
        }
    }
    


    const [sleepRecord0DaysBefore, setSleepRecord0DaysBefore] = useState({wakeTime: wakeTimeDefault, fellAsleep: fellAsleepDefault, submitted: retrieveSubmittedValue(0)});
    const [sleepRecord1DaysBefore, setSleepRecord1DaysBefore] = useState({wakeTime: wakeTimeDefault, fellAsleep: fellAsleepDefault, submitted: retrieveSubmittedValue(1)});
    const [sleepRecord2DaysBefore, setSleepRecord2DaysBefore] = useState({wakeTime: wakeTimeDefault, fellAsleep: fellAsleepDefault, submitted: retrieveSubmittedValue(2)});
    const [sleepRecord3DaysBefore, setSleepRecord3DaysBefore] = useState({wakeTime: wakeTimeDefault, fellAsleep: fellAsleepDefault, submitted: retrieveSubmittedValue(3)});
    const [sleepRecord4DaysBefore, setSleepRecord4DaysBefore] = useState({wakeTime: wakeTimeDefault, fellAsleep: fellAsleepDefault, submitted: retrieveSubmittedValue(4)});
    const [sleepRecord5DaysBefore, setSleepRecord5DaysBefore] = useState({wakeTime: wakeTimeDefault, fellAsleep: fellAsleepDefault, submitted: retrieveSubmittedValue(5)});
    const [sleepRecord6DaysBefore, setSleepRecord6DaysBefore] = useState({wakeTime: wakeTimeDefault, fellAsleep: fellAsleepDefault, submitted: retrieveSubmittedValue(6)});
    
    

    const getFormattedDate = (numberOfDaysAgo = 0) => {
        const currentDate = new Date();
        const date = currentDate.getDate() - numberOfDaysAgo;
        
        const selecetedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
        let stringDate = selecetedDate.toLocaleDateString('en-GB'); 

        if(numberOfDaysAgo === 0){
            return 'Today'
        } else if(numberOfDaysAgo === 1){
            return 'Yesterday'
        }
        return stringDate.slice(0, 5);
    };


    function getRawDate(numberOfDaysAgo = 0){
        const currentDate = new Date();
        const date = currentDate.getDate() - numberOfDaysAgo;
        const selecetedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
        return selecetedDate.toLocaleDateString('en-GB'); 
    }

    const sleepRecordJson = localStorage.getItem('sleepRecord');
    let orderedDaysSleepRecord;

    if(sleepRecordJson){
        let sleepRecord = JSON.parse(sleepRecordJson);
        sleepRecord.forEach(element => {
            let daysBefore = getRawDate().getDate() - element.date.getDate();
            orderedDaysSleepRecord[daysBefore] = element;
        });
    };


    const handleWakeUp0DaysBefore = (event) => {

        setSleepRecord0DaysBefore((prev)=> {return {...prev, date: getRawDate(), wakeTime: event.target.value}})
    };
    const handleFellAsleep0DaysBefore = (event) => {

        setSleepRecord0DaysBefore((prev)=> {return {...prev, fellAsleep: event.target.value}});
    };
    const handleWakeUp1DaysBefore = (event) => {  

        setSleepRecord1DaysBefore((prev)=> {return {...prev, date: getRawDate(1), wakeTime: event.target.value}})
    };
    const handleFellAsleep1DaysBefore = (event) => {

        setSleepRecord1DaysBefore((prev)=> {return {...prev, fellAsleep: event.target.value}});
    };
    const handleWakeUp2DaysBefore = (event) => {

        setSleepRecord2DaysBefore((prev)=> {return {...prev, date: getRawDate(2), wakeTime: event.target.value}})
    };
    const handleFellAsleep2DaysBefore = (event) => {

        setSleepRecord2DaysBefore((prev)=> {return {...prev, fellAsleep: event.target.value}});
    };
    const handleWakeUp3DaysBefore = (event) => {
        
        setSleepRecord3DaysBefore((prev)=> {return {...prev, date: getRawDate(3), wakeTime: event.target.value}});
    };
    const handleFellAsleep3DaysBefore = (event) => {

        setSleepRecord3DaysBefore((prev)=> {return {...prev, fellAsleep: event.target.value}});
    };
    const handleWakeUp4DaysBefore = (event) => {

        setSleepRecord4DaysBefore((prev)=> {return {...prev, date: getRawDate(4), wakeTime: event.target.value}});
    };
    const handleFellAsleep4DaysBefore = (event) => {

        setSleepRecord4DaysBefore((prev)=> {return {...prev, fellAsleep: event.target.value}});
    };
    const handleWakeUp5DaysBefore = (event) => {
        
        setSleepRecord5DaysBefore((prev)=> {return {...prev, date: getRawDate(5), wakeTime: event.target.value}});
    };
    const handleFellAsleep5DaysBefore = (event) => {

        setSleepRecord5DaysBefore((prev)=> {return {...prev, fellAsleep: event.target.value}});
    };
    const handleWakeUp6DaysBefore = (event) => {

        setSleepRecord6DaysBefore((prev)=> {return {...prev, date: getRawDate(6), wakeTime: event.target.value}});
    };
    const handleFellAsleep6DaysBefore = (event) => {

        setSleepRecord6DaysBefore((prev)=> {return {...prev, fellAsleep: event.target.value}});
    };

    const onSubmitForm0 = (event) => {
        event.preventDefault();
        let date = getRawDate();

        setSleepRecord0DaysBefore((prev)=> {return {...prev, date: [date], submitted: true}});

        let sleepData = localStorage.getItem('sleepData');
        sleepData = JSON.parse(sleepData);

        sleepData = {...sleepData, [date]: {...sleepRecord0DaysBefore, submitted: true}};

        const sleepDataStringified = JSON.stringify(sleepData);
        localStorage.setItem('sleepData', sleepDataStringified);
        
    }

    const onSubmitForm1 = (event) => {
        event.preventDefault();
        let date = getRawDate(1);

        setSleepRecord1DaysBefore((prev)=> {return {...prev, date: [date], submitted: true}});

        let sleepData = localStorage.getItem('sleepData');
        sleepData = JSON.parse(sleepData);

        sleepData = {...sleepData, [date]: {...sleepRecord1DaysBefore, submitted: true}};

        const sleepDataStringified = JSON.stringify(sleepData);
        localStorage.setItem('sleepData', sleepDataStringified);
    }
    
    const onSubmitForm2 = (event) => {
        event.preventDefault();
        let date = getRawDate(2);

        setSleepRecord2DaysBefore((prev)=> {return {...prev, date: [date], submitted: true}});

        let sleepData = localStorage.getItem('sleepData');
        sleepData = JSON.parse(sleepData);

        sleepData = {...sleepData, [date]: {...sleepRecord2DaysBefore, submitted: true}};

        const sleepDataStringified = JSON.stringify(sleepData);
        localStorage.setItem('sleepData', sleepDataStringified);
    }
    const onSubmitForm3 = (event) => {
        event.preventDefault();
        let date = getRawDate(3);

        setSleepRecord3DaysBefore((prev)=> {return {...prev, date: [date], submitted: true}});

        let sleepData = localStorage.getItem('sleepData');
        sleepData = JSON.parse(sleepData);

        sleepData = {...sleepData, [date]: {...sleepRecord3DaysBefore, submitted: true}};

        const sleepDataStringified = JSON.stringify(sleepData);
        localStorage.setItem('sleepData', sleepDataStringified);
    }
    const onSubmitForm4 = (event) => {
        event.preventDefault();
        let date = getRawDate(4);

        setSleepRecord4DaysBefore((prev)=> {return {...prev, date: [date], submitted: true}});

        let sleepData = localStorage.getItem('sleepData');
        sleepData = JSON.parse(sleepData);

        sleepData = {...sleepData, [date]: {...sleepRecord4DaysBefore, submitted: true}};

        const sleepDataStringified = JSON.stringify(sleepData);
        localStorage.setItem('sleepData', sleepDataStringified);
    }
    const onSubmitForm5 = (event) => {
        event.preventDefault();
        let date = getRawDate(5);

        setSleepRecord5DaysBefore((prev)=> {return {...prev, date: [date], submitted: true}});

        let sleepData = localStorage.getItem('sleepData');
        sleepData = JSON.parse(sleepData);

        sleepData = {...sleepData, [date]: {...sleepRecord5DaysBefore, submitted: true}};

        const sleepDataStringified = JSON.stringify(sleepData);
        localStorage.setItem('sleepData', sleepDataStringified);
    }
    const onSubmitForm6 = (event) => {
        event.preventDefault();
        let date = getRawDate(6);

        setSleepRecord6DaysBefore((prev)=> {return {...prev, date: [date], submitted: true}});

        let sleepData = localStorage.getItem('sleepData');
        sleepData = JSON.parse(sleepData);

        sleepData = {...sleepData, [date]: {...sleepRecord6DaysBefore, submitted: true}};

        const sleepDataStringified = JSON.stringify(sleepData);
        localStorage.setItem('sleepData', sleepDataStringified);
    }

    return ( 
        <div className="past-seven-days-container" >
            {(sleepRecord0DaysBefore.submitted) ? (
                <div className="one-day-of-seven-days"> 
                    <BsThreeDots onClick={()=>{setSleepRecord0DaysBefore((prev)=> {return {...prev, submitted: false}})}}/>
                    <h3>Submitted</h3>
                    <SleepCircleDisplay />
                </div>
            ):(
                <form onSubmit={onSubmitForm0}  className="one-day-of-seven-days" >
                    <h3>{getFormattedDate(0)}</h3>

                    <label for="wake-up" >Wake Up</label>
                    <br />
                    <input type="time" id="wake-up" name="wake-up-0"  value={sleepRecord0DaysBefore.wakeTime} onChange={handleWakeUp0DaysBefore} />
                    <br />
                    <label for="fell-asleep" >Fell Asleep</label>
                    <br />
                    <input type="time" id="fell-asleep" name={`fell-asleep-${getFormattedDate(0)}`} value={sleepRecord0DaysBefore.fellAsleep} onChange={handleFellAsleep0DaysBefore} />
                    <button type="submit"><TiTick /></button>
                </form>
            )}
            {(sleepRecord1DaysBefore.submitted) ? (
                <div className="one-day-of-seven-days"> 
                    <BsThreeDots onClick={()=>{setSleepRecord1DaysBefore((prev)=> {return {...prev, submitted: false}})}}/>
                    <h3>Submitted</h3>
                </div>
            ):(
                <form onSubmit={onSubmitForm1} className="one-day-of-seven-days" >
                    <h3>{getFormattedDate(1)}</h3>
                
                    <label for="wake-up" >Wake Up</label>
                    <br />
                    <input type="time" id="wake-up" name={`wake-up-${getFormattedDate(1, true)}`} value={sleepRecord1DaysBefore.wakeTime} onChange={handleWakeUp1DaysBefore} />
                    <br />
                    <label for="fell-asleep" >Fell Asleep</label>
                    <br />
                    <input type="time" id="fell-asleep" name={`fell-asleep-${getFormattedDate(1, true)}`} value={sleepRecord1DaysBefore.fellAsleep} onChange={handleFellAsleep1DaysBefore} />
                    <button type="submit"><TiTick /></button>
                </form>
            )}
            {(sleepRecord2DaysBefore.submitted) ? (
                <div className="one-day-of-seven-days"> 
                    <BsThreeDots onClick={()=>{setSleepRecord2DaysBefore((prev)=> {return {...prev, submitted: false}})}}/>
                    <h3>Submitted</h3>
                </div>
            ):(
                <form onSubmit={onSubmitForm2} className="one-day-of-seven-days" >
                    <h3>{getFormattedDate(2)}</h3>
                
                    <label for="wake-up" >Wake Up</label>
                    <br />
                    <input type="time" id="wake-up" name={`wake-up-${getFormattedDate(0, true)}`} value={sleepRecord2DaysBefore.wakeTime} onChange={handleWakeUp2DaysBefore} />
                    <br />
                    <label for="fell-asleep" >Fell Asleep</label>
                    <br />
                    <input type="time" id="fell-asleep" name={`fell-asleep-${getFormattedDate(0, true)}`} value={sleepRecord2DaysBefore.fellAsleep} onChange={handleFellAsleep2DaysBefore} />
                    <button type="submit"><TiTick /></button>
                 </form>
            )}
            {(sleepRecord3DaysBefore.submitted) ? (
                <div className="one-day-of-seven-days"> 
                    <BsThreeDots onClick={()=>{setSleepRecord3DaysBefore((prev)=> {return {...prev, submitted: false}})}}/>
                    <h3>Submitted</h3>
                </div>
            ):(
                <form onSubmit={onSubmitForm3} className="one-day-of-seven-days" >
                    <h3>{getFormattedDate(3)}</h3>
                
                    <label for="wake-up" >Wake Up</label>
                    <br />
                    <input type="time" id="wake-up" name={`wake-up-${getFormattedDate(1, true)}`} value={sleepRecord3DaysBefore.wakeTime} onChange={handleWakeUp3DaysBefore} />
                    <br />
                    <label for="fell-asleep" >Fell Asleep</label>
                    <br />
                    <input type="time" id="fell-asleep" name={`fell-asleep-${getFormattedDate(1, true)}`} value={sleepRecord3DaysBefore.fellAsleep} onChange={handleFellAsleep3DaysBefore} />
                    <button type="submit"><TiTick /></button>
                </form>
            )}
            {(sleepRecord4DaysBefore.submitted) ? (
                <div className="one-day-of-seven-days"> 
                    <BsThreeDots onClick={()=>{setSleepRecord4DaysBefore((prev)=> {return {...prev, submitted: false}})}}/>
                    <h3>Submitted</h3>
                </div>
            ):(
                <form onSubmit={onSubmitForm4} className="one-day-of-seven-days" >
                    <h3>{getFormattedDate(4)}</h3>
                
                    <label for="wake-up" >Wake Up</label>
                    <br />
                    <input type="time" id="wake-up" name={`wake-up-${getFormattedDate(0, true)}`} value={sleepRecord4DaysBefore.wakeTime} onChange={handleWakeUp4DaysBefore} />
                    <br />
                    <label for="fell-asleep" >Fell Asleep</label>
                    <br />
                    <input type="time" id="fell-asleep" name={`fell-asleep-${getFormattedDate(0, true)}`} value={sleepRecord4DaysBefore.fellAsleep} onChange={handleFellAsleep4DaysBefore} />
                    <button type="submit"><TiTick /></button>
                </form>
            )}
            {(sleepRecord5DaysBefore.submitted) ? (
                <div className="one-day-of-seven-days"> 
                    <BsThreeDots onClick={()=>{setSleepRecord5DaysBefore((prev)=> {return {...prev, submitted: false}})}}/>
                    <h3>Submitted</h3>
                </div>
            ):(
                <form onSubmit={onSubmitForm5} className="one-day-of-seven-days" >
                    <h3>{getFormattedDate(5)}</h3>
                    <label for="wake-up" >Wake Up</label>
                    <br />
                    <input type="time" id="wake-up" name={`wake-up-${getFormattedDate(1, true)}`} value={sleepRecord5DaysBefore.wakeTime} onChange={handleWakeUp5DaysBefore} />
                    <br />
                    <label for="fell-asleep" >Fell Asleep</label>
                    <br />
                    <input type="time" id="fell-asleep" name={`fell-asleep-${getFormattedDate(1, true)}`} value={sleepRecord5DaysBefore.fellAsleep} onChange={handleFellAsleep5DaysBefore} />
                    <button type="submit"><TiTick /></button>
                </form>
            )}
            {(sleepRecord6DaysBefore.submitted) ? (
                <div className="one-day-of-seven-days"> 
                    <BsThreeDots onClick={()=>{setSleepRecord6DaysBefore((prev)=> {return {...prev, submitted: false}})}}/>
                    <h3>Submitted</h3>

                </div>
            ):(
                <form onSubmit={onSubmitForm6} className="one-day-of-seven-days" >
                    <h3>{getFormattedDate(6)}</h3>
                    <label for="wake-up" >Wake Up</label>
                    <br />
                    <input type="time" id="wake-up" name={`wake-up-${getFormattedDate(0, true)}`} value={sleepRecord6DaysBefore.wakeTime} onChange={handleWakeUp6DaysBefore} />
                    <br />
                    <label for="fell-asleep" >Fell Asleep</label>
                    <br />
                    <input type="time" id="fell-asleep" name={`fell-asleep-${getFormattedDate(0, true)}`} value={sleepRecord6DaysBefore.fellAsleep} onChange={handleFellAsleep6DaysBefore} />
                    <button type="submit"><TiTick /></button>
                </form>
            )}
        </div>

    );
}

export default DisplaySleepData;