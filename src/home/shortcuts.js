import React, { useState, useEffect, useRef } from 'react';
import styles from './shortcuts.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import bbc_image from '../images/bbc_news.png';
import facebook_image from '../images/facebook.png';
import youtube_image from '../images/youtube.png';
import amazon_image from '../images/amazon.jpg';
import netflix_image from '../images/netflix.png';
import spotify_image from '../images/spotify.png';
import wikipedia_image from '../images/wikipedia.png';
import plus_sign from '../images/plus_sign.png';


const Shortcuts = () => {
    const [shortcutState, setShortcutState] = useState([]);
    const [addShortcutClicked, setAddShortcutClicked] = useState(Array(12).fill(false));
    const [shortcutToAdd, setShortcutToAdd] = useState({
        name: '',
        url: ''
    });
    const [shortcutEdit, setShortcutEdit] = useState(false);
    const intialRender = useRef(0);
    const resetShortcutToAdd = () => {
        setShortcutToAdd({
            name: '',
            url: '',
            image: null
        })
    }

    let presetShortcuts = [
        {   name: 'BBC',
            url: 'https://www.bbc.co.uk/news',
            image: bbc_image},
        {   name: 'Facebook',
            url: 'https://www.facebook.com/',
            image: facebook_image}, 
        {   name: 'Youtube',
            url: 'https://www.youtube.com/',
            image: youtube_image}, 
        {   name: 'Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Main_Page',
            image: wikipedia_image}, 
        {   name: 'Amazon',
            url: 'https://www.amazon.co.uk/',
            image: amazon_image },
        {   name: 'Netflix',
            url: 'https://www.netflix.com',
            image: netflix_image},
        {   name: 'Spotify',
            url: 'https://open.spotify.com/',
            image: spotify_image}
    ];

    if(intialRender.current === 0 ){
        intialRender.current += 1;
        let storedShortcuts = JSON.parse( localStorage.getItem('shortcuts') );
        if(storedShortcuts === null){
            setShortcutState(presetShortcuts);
        } else {
            setShortcutState(storedShortcuts);
        }
    }
    
    const resetShortcutList = () => {
        setShortcutState(presetShortcuts);
    }    

    const faviconUrlEdit = (url) => {
        let prefix = 'https://api.statvoo.com/favicon/?url=';
        url.replace('https://', '');
        return prefix + url 
    }

    const addShortcutFormOpen = (event) => {
        let index = event.target.id.replace('_', '');
        index = Number(index);
        console.log(index);
        let prev = [...addShortcutClicked]; 
        prev.splice(index, 1, !prev[index]);
        setAddShortcutClicked(prev);
        resetShortcutToAdd();
        setShortcutEdit(false)
    }

    const onShortcutSubmit = (event) => {
        event.preventDefault();
        setShortcutState(prev => [...prev, shortcutToAdd])
        resetShortcutToAdd();
    }

    useEffect(() => {
        localStorage.setItem('shortcuts', JSON.stringify(shortcutState));
        shortcutDisplay();
    }, [shortcutState]);

    const handleNameChange = (event) => {
        setShortcutToAdd(prev => ( { ...prev,  name: event.target.value } ) );  
    };
    const handleUrlChange = (event) => {
        setShortcutToAdd(prev => ( { ...prev,  url: event.target.value } ) );  
    };


    const deleteShortcut = (event, index) => {
        event.stopPropagation();
        let shortcutsTemporary = [...shortcutState];
        shortcutsTemporary.splice(index, 1);
        console.log(shortcutsTemporary);
        setShortcutState(shortcutsTemporary);
    }
    const followLink = (i) => {
        window.open(shortcutState[i].url, '_self');
    }
    
    const shortcutDisplay = () => {
        let shortcutDisplayArray = [];
        for(let i=0; i < shortcutState.length; i++){
            shortcutDisplayArray.push(
                <div key={shortcutState[i].name} className={`${styles.shortcut_square} ${(shortcutEdit) ? styles.shake : null}`} onClick={() => followLink(i)}>
                    {(shortcutEdit) ? (
                    <div className={styles.shortcut_delete_circle}>
                        <IoClose onClick={(event) => deleteShortcut(event, i)} className={styles.delete_shortcut}/>
                    </div>) : null }
                    <img src={(shortcutState[i].image == null)? (faviconUrlEdit(shortcutState[i].url)) : (shortcutState[i].image)} alt={shortcutState[i].name} className={(shortcutState[i].image == null) ? (styles.favicon_retrieved) : (styles.favicon)} />
                </div> )
        };
        let i = 0;
        console.log(shortcutDisplayArray.length);

        while(shortcutDisplayArray.length < 12){
            i += 1;
            shortcutDisplayArray.push(
            <div key={`shortcuts_blank_${i}`} className={styles.shortcut_square} >
                <img src={plus_sign} alt={'Add link to shortcuts'} className={styles.plus_sign} id={`_${i}`} onClick={(event) => { addShortcutFormOpen(event) }}/>
                { addShortcutClicked[i] === true ? 
                (<div className={styles.form_container}>
                    <IoClose className={styles.close_add_shortcut} id={`_${i}`} onClick={(event) => { addShortcutFormOpen(event) }}/>
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
                </div>) : null }
            </div>)
        };
        console.log(shortcutDisplayArray.length)
        return shortcutDisplayArray
    };


    return (
        <section className={`${styles.shortcuts} ${styles.component}`}>
            <div className={styles.icons} >
                < BsThreeDots onClick={() => setShortcutEdit(prev => !prev)} className={styles.edit_shortcut_icon}/>
                < GrPowerReset onClick={() => resetShortcutList()} className={styles.reset_shortcut_icon} />
            </div>
            {shortcutDisplay()}
        </section>
    )
}

export default Shortcuts;