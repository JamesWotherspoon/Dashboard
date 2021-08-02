
import React, { useState} from 'react';
import styles from './WeatherApi.module.scss';


const WeatherInput = ({ handlePostcode }) => {

    const [inputPostcode, setInputPostcode] = useState('');
      
    // Handle postcode input and submit
    const inputChange = (event) => {
        setInputPostcode(event.target.value.toUpperCase())
    };
    
    const submitPostcode = (event)=> {
        event.preventDefault();
        handlePostcode(inputPostcode);
        localStorage.setItem('postcode', JSON.stringify(inputPostcode));
    };



    return (
        <form className={styles.postcode_form}>
            <label htmlFor="postcode" className={styles.postcode_label} >What is your postcode?</label>
            <div className={styles.input_container}>
                <input type="text" name="postcode" value={inputPostcode} onChange={inputChange} pattern="[a-zA-Z0-9]" minLength="4" maxLength="8" required/>               
                <button onClick={submitPostcode}>Submit</button>
            </div>
        </form>
    );
}

export default WeatherInput;