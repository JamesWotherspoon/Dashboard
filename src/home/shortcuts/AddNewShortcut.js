import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Shortcuts.module.scss';
import plus_sign from '../../images/plus_sign.png';
import { IoClose } from 'react-icons/io5';
import { CgShortcut } from 'react-icons/cg';

const AddNewShortcut = ({index, addShortcut, resetShortcuts}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const addShortcutSquare = useRef(null);

    const toggleForm = (clickedTarget) => {
        if(addShortcutSquare.current.contains(clickedTarget)){
            return 
        }
        setIsFormOpen(prev => !prev);
    }

    return (
        <div className={`${styles.shortcut_square_form_container}`} >
            <div className={`${styles.shortcut_square} ${styles.non_link_square} ${isFormOpen ? styles.add_shortcut_active : null}`} onClick={() => toggleForm()} ref={addShortcutSquare}>
                <img src={plus_sign} alt={'Add a website to your shortcuts'} className={styles.plus_sign} />
            </div>
            {isFormOpen ? 
                <ShortcutForm 
                    toggleForm={toggleForm} 
                    index={index} 
                    addShortcut={addShortcut}
                    resetShortcuts={resetShortcuts}
                />
            : null }
        </div>      
    )
}

function ShortcutForm({ toggleForm, index, addShortcut, resetShortcuts}) {
    const [shortcutToAdd, setShortcutToAdd] = useState({
        name: '',
        url: ''
    });
    const formContainerRef = useRef(null)

    //Close form if user clicks outside of form or shortcut component

    const closeForm = useCallback( (event) => {
        if(!formContainerRef.current.contains(event.target)){
            toggleForm(event.target)
        }   
    }, [toggleForm])

    useEffect(() => {
        document.addEventListener('mouseup', closeForm)
        return () => {
            document.removeEventListener('mouseup', closeForm)
        }
    }, [closeForm])

    //

    const handleNameChange = (event) => {
        setShortcutToAdd(prev => ( { ...prev,  name: event.target.value } ) );  
    };
    
    const handleUrlChange = (event) => {
        setShortcutToAdd(prev => ( { ...prev,  url: event.target.value } ) );  
    };

    const onShortcutSubmit = () => {
        addShortcut(index, shortcutToAdd);
        setShortcutToAdd({
            name: '',
            url: ''
        });
    };

    return (
        <div className={styles.add_shortcut_container} ref={formContainerRef}>
            <form className={styles.add_shortcut_form}>
                <IoClose className={styles.add_shortcut_close_form_icon} onClick={() => toggleForm()}/>
                <h2>
                    <CgShortcut className={styles.add_shortcut_title_icon}/>
                    Shortcut
                </h2>
                <div className={styles.add_shortcut_input_label_container}>
                    <label className={styles.add_shortcut_label} htmlFor="name">Name of website</label>
                    <input type="text" placeholder="" className={styles.add_shortcut_input} id="name" value={shortcutToAdd.name} onChange={handleNameChange}></input>
                </div>
                <div className={styles.add_shortcut_input_label_container}>
                    <label className={styles.add_shortcut_label} htmlFor="url">URL of website</label>
                    <input type="text" className={styles.add_shortcut_input} id="url" value={shortcutToAdd.url} onChange={handleUrlChange}></input>          
                </div>
                <div className={styles.add_shortcut_button_container}>
                    <div className={`${styles.add_shortcut_button} ${styles.add_shortcut_button_reset}`} onClick={() => {toggleForm(); resetShortcuts()}}>
                        Reset all shortcuts
                    </div>
                    <div className={styles.add_shortcut_button} onClick={() => toggleForm()}>
                        Cancel
                    </div>
                    <div className={`${styles.add_shortcut_button} ${styles.add_shortcut_button_create}`} onClick={onShortcutSubmit} >
                        Create shortcut
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNewShortcut;