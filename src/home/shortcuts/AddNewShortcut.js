import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Shortcuts.module.scss';
import plus_sign from '../../images/plus_sign.png';
import { IoClose } from 'react-icons/io5';

const AddNewShortcut = ({index, addShortcut}) => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const toggleForm = () => {
        setIsFormOpen(prev => !prev);
    }

    return (
        <div >
            <div key={`shortcuts_blank_${index}`} className={styles.shortcut_square} onClick={toggleForm}>
                <img src={plus_sign} alt={'Add a website to your shortcuts'} className={styles.plus_sign} />
            </div>
            { isFormOpen === true ?
                <ShortcutForm toggleForm={toggleForm} index={index} addShortcut={addShortcut} />
            : null }
        </div>      
    )
}

function ShortcutForm({ toggleForm, index, addShortcut }) {
    const [shortcutToAdd, setShortcutToAdd] = useState({
        name: '',
        url: ''
    });
    const formContainerRef = useRef(null)

    //Close form if user clicks outside of form component

    const closeForm = useCallback( (event) => {
            if(!formContainerRef.current.contains(event.target)){
                toggleForm()
            }   
    }, [toggleForm])

    useEffect(() => {
        document.addEventListener('mousedown', closeForm)
        return () => {
            document.removeEventListener('mousedown', closeForm)
        }
    }, [closeForm])

    //

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

    return (
        <div className={styles.form_container} ref={formContainerRef}>
            <IoClose className={styles.close_add_shortcut} onClick={toggleForm}/>      
            <form onSubmit={onShortcutSubmit}>
                <div className={styles.name_container}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={shortcutToAdd.name} onChange={handleNameChange}/>
                </div>
                <div className={styles.url_container}>
                    <label htmlFor="url" >URL:</label>
                    <input type="text" id="url" value={shortcutToAdd.url} onChange={handleUrlChange} />
                </div>
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default AddNewShortcut;