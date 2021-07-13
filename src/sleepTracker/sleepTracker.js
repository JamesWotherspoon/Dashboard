import React, { useState } from 'react';
import './sleepTracker.scss';
import { VscSettings } from 'react-icons/vsc';
import DisplaySleepData from './displaySleepData';

const SleepTracker = () => {
    const [sleepInfo, setSleepInfo] = useState(()=>{ if(localStorage.getItem('sleepTarget') !== null){ return true } else { return false}});
    const [sleepTarget, setSleepTarget] = useState('00:00');
    const [bedTime, setbedTime] = useState('22:00');
    const [wakeTime, setWakeTime] = useState('08:00');
    const [windDown, setWindDown] = useState(false);


    const handleSleepTarget = (event) => {
        setSleepTarget(event.target.value);
    };

    const handleBedTime  = (event) => {
        setbedTime(event.target.value);
    };

    const handleWakeTime  = (event) => {
        setWakeTime(event.target.value);
    };
    const handleWindDown  = (event) => {
        setWindDown(event.target.checked);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        
        const sleepSchedule = {
            sleepTarget: sleepTarget,
            bedTime: bedTime,
            wakeTime: wakeTime,
            windDown: windDown,
        };
        const sleepScheduleString = JSON.stringify(sleepSchedule);
        localStorage.setItem('sleepTarget', sleepScheduleString);
        setSleepInfo(true);
    };
    const toggleSleepInfo = () => {
        setSleepInfo(!sleepInfo);
    };
    

    return (
        <section className="sleep-main-display">
            <h1> Sleep</h1>
            <VscSettings onClick={toggleSleepInfo}/>
            {sleepInfo ? (
                <>
                <h2>Last 7 Days</h2>
                <DisplaySleepData />
                </>
            ):(
                <form onSubmit={onFormSubmit} className="sleep-target">
                    <label for="sleep-target">Sleep Target</label>
                    <input type="time" id="sleep-target" name="sleep-target" value={sleepTarget} onChange={handleSleepTarget}/>
                    <label for="bed-time">Bed Time</label>
                    <input type="time" id="bed-time" name="bed-time" value={bedTime} onChange={handleBedTime}/>
                    <label for="wake-time">Wake Up</label>
                    <input type="time" id="wake-time" name="wake-time" value={wakeTime} onChange={handleWakeTime}/>
                    <label for="wind-down-alert">30 Minute Wind Down Alert</label>
                    <input type="checkbox" id="wind-down-alert" name="wind-down-alert" checked={windDown} onChange={handleWindDown}/>
                    <button type="submit" >Set Sleep Target</button>

                </form>
            )}


        </section>
    );

};

export default SleepTracker;