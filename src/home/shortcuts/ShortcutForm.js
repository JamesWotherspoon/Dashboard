import React, { useState } from 'react';
import styles from './shortcuts.module.scss';
import plus_sign from '../../images/plus_sign.png';
import { IoClose } from 'react-icons/io5';

const ShortcutForm = ({index, addShortcut, toggleForm, shortcutList}) => {
    const [shortcutToAdd, setShortcutToAdd] = useState({
        name: '',
        url: ''
    });

    const handleNameChange = (event) => {
        setShortcutToAdd(prev => ( { ...prev,  name: event.target.value } ) );  
    };
    const handleUrlChange = (event) => {
        setShortcutToAdd(prev => ( { ...prev,  url: event.target.value } ) );  
    };

    const onShortcutSubmit = (event) => {
        event.preventDefault();
        addShortcut(index, shortcutToAdd);
        setShortcutToAdd({
            name: '',
            url: ''
        });
    };

    console.log(shortcutList);

    return (
        <div key={`shortcuts_blank_${index}`} className={styles.shortcut_square} >
            <img src={plus_sign} alt={'Add link to shortcuts'} className={styles.plus_sign} onClick={() => toggleForm(index)}/>
            { shortcutList[index].formOpen === true ?
                <div className={styles.form_container}>
                    <IoClose className={styles.close_add_shortcut} onClick={() => toggleForm(index)}/>      
                    <form onSubmit={onShortcutSubmit}>
                        <div className={styles.name_container}>
                            <label for="name">Name:</label>
                            <input type="text" id="name" value={shortcutToAdd.name} onChange={handleNameChange}/>
                        </div>
                        <div className={styles.url_container}>
                            <label for="url" >URL:</label>
                            <input type="text" id="url" value={shortcutToAdd.url} onChange={handleUrlChange} />
                        </div>
                        <button type="submit" >Submit</button>
                    </form>
                </div>
            : null }
        </div>
    )
}

export default ShortcutForm;