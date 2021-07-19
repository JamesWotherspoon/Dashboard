import React, { useState } from 'react';
import styles from './settings.module.scss';
import Cube from './cube';

const Settings = () => {
    const [accountSettings, setAccountSettings] = useState({
        postcode: '',
        name: ''

    });

    // retrieve data already stored for account settings
    let storedAccountSettings = JSON.parse( localStorage.getItem( accountSettings ) );




    const handleInputChange = (event) => {
        setAccountSettings(prev => ( { ...prev,  [event.target.name]: event.target.value } ) );  
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        localStorage.setItem( JSON.stringify( accountSettings ));


    }
    return (
        <section className={styles.settings}>
            <h1>Settings</h1> 
            <div>
                <form autoComplete="off" onSubmit={onFormSubmit}>
                    <label for="name:" > Your Name: </label>
                    <input type="text" name="name" placeholder="..." value={accountSettings.name} onChange={handleInputChange} />
                    <br />
                    <label for="postcode" > Postcode: </label>
                    {(storedAccountSettings !== null ) ? ( <h3 > {storedAccountSettings.postcode} </h3> 
                        ) : (
                    <input type="text" name="postcode" placeholder="..." value={accountSettings.postcode} pattern="[a-zA-Z0-9]" minLength="4" maxLength="7" onChange={handleInputChange} /> )}
                    <br />

                    <button > </button>
                </form>
            </div>
        <Cube ></Cube>
        </section>
    )
}

export default Settings
