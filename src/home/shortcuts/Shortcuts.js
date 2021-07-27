import React, { useState, useEffect, useMemo } from 'react';
import styles from './shortcuts.module.scss';
import home_styles from '../home.module.scss';
import ShortcutForm from './ShortcutForm';
import { BsThreeDots } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import bbc_image from '../../images/bbc_news.png';
import facebook_image from '../../images/facebook.png';
import youtube_image from '../../images/youtube.png';
import amazon_image from '../../images/amazon.jpg';
import netflix_image from '../../images/netflix.png';
import spotify_image from '../../images/spotify.png';
import wikipedia_image from '../../images/wikipedia.png';

import twitter_image from '../../images/twitter.jpg';
import imbd_image from '../../images/imbd.png';
import { v4 as uuidv4 } from 'uuid';


const Shortcuts = () => {
    const [shortcutList, setShortcutList] = useState(
        Array(9).fill({   
            name: '',
            url: '',
            image: '',
            index: 0,
            formOpen: false}
        )
    );
    const [addShortcutClicked, setAddShortcutClicked] = useState();
    
    const [shortcutEdit, setShortcutEdit] = useState(false);

    const presetShortcuts = useMemo(() => [
        {   name: 'BBC',
            url: 'https://www.bbc.co.uk/news',
            image: bbc_image,
            index: 0,
            formOpen: false},
        {   name: 'Facebook',
            url: 'https://www.facebook.com/',
            image: facebook_image,
            index: 1,
            formOpen: false}, 
        {   name: 'Youtube',
            url: 'https://www.youtube.com/',
            image: youtube_image,
            index: 2,
            formOpen: false}, 
        {   name: 'Wikipedia',
            url: 'https://en.wikipedia.org/wiki/Main_Page',
            image: wikipedia_image,
            index: 3,
            formOpen: false}, 
        {   name: 'Amazon',
            url: 'https://www.amazon.co.uk/',
            image: amazon_image,
            index: 4,
            formOpen: false},
        {   name: 'Netflix',
            url: 'https://www.netflix.com',
            image: netflix_image,
            index: 5,
            formOpen: false},
        {   name: 'Spotify',
            url: 'https://open.spotify.com/',
            image: spotify_image,
            index: 6,
            formOpen: false},
        {   name: 'Twitter',
            url: 'https://twitter.com/?lang=en-gb',
            image: twitter_image,
            index: 7,
            formOpen: false},
        {   name: 'IMBD',
            url: 'https://www.imdb.com/',
            image: imbd_image,
            index: 8,
            formOpen: false}
    ], [])

    useEffect(() => {
        
        const storedShortcuts = JSON.parse( localStorage.getItem('shortcuts') );
        if(storedShortcuts === null){
            setShortcutList(presetShortcuts);
        } else {
            setShortcutList(storedShortcuts);
        }
    }, [presetShortcuts])

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
        
        setShortcutEdit(false)
    }

    useEffect(() => {
        localStorage.setItem('shortcuts', JSON.stringify(shortcutList));
    }, [shortcutList]);

    const deleteShortcut = (event, index) => {
        event.stopPropagation();
        setShortcutList(prev => {
            let shortcutListClone = [...prev];
            shortcutListClone[index] = {url: '', name: '', image: '', formOpen: false}
            return shortcutListClone
        })
    }

    const followLink = (i) => {
        window.open(shortcutList[i].url, '_self');
    }
    
    const addShortcut = (index, shortcutToAdd) => {
        const url = faviconUrlEdit(shortcutToAdd.url);

        setShortcutList(prev => {
            let shortcutListClone = [...prev];
            shortcutListClone[index] = {url: shortcutToAdd.url, name: shortcutToAdd.name, image: url, formOpen: false}
            return shortcutListClone
        })
    }

    const toggleForm = (index) => {
        setShortcutList(prev => {
            let shortcutListClone = [...prev];
            shortcutListClone[index] = {url: '', name: '', image: '', formOpen: !prev[index].formOpen}
            return shortcutListClone
        })
    }
    
    const shortcutDisplay = () => {
        let shortcutDisplayArray = [];
        for(let i=0; i < 9; i++){
            if(shortcutList[i].name){
                shortcutDisplayArray.push(
                    <div key={`${shortcutList[i].name}_${i}`} className={`${styles.shortcut_square} ${(shortcutEdit) ? styles.shake : null}`} onClick={() => followLink(i)}>
                        {(shortcutEdit) ? (
                        <div className={styles.shortcut_delete_circle}>
                            <IoClose onClick={(event) => deleteShortcut(event, i)} className={styles.delete_shortcut}/>
                        </div>) : null }
                        <img src={(shortcutList[i].image === null)? (faviconUrlEdit(shortcutList[i].url)) : (shortcutList[i].image)} alt={shortcutList[i].name} className={(shortcutList[i].image == null) ? (styles.favicon_retrieved) : (styles.favicon)} />
                    </div> 
                )
            } else {
                shortcutDisplayArray.push(
                    <ShortcutForm index={i} addShortcut={addShortcut} toggleForm={toggleForm} shortcutList={shortcutList} key={uuidv4()}/>
                )
            }
        };

        // edit icon 
        shortcutDisplayArray.push(
            <div key={`shortcuts_blank_edit`} className={styles.shortcut_square} >
                < BsThreeDots onClick={() => setShortcutEdit(prev => !prev)} className={styles.edit_shortcut_icon}/>
                {(shortcutEdit) ? 
                (<div key={`shortcuts_blank_reset`} className={styles.shortcut_square} id={styles.reset_icon}>
                    < GrPowerReset onClick={() => setShortcutList(presetShortcuts)} className={styles.reset_shortcut_icon} />
                </div>) : null}
            </div>
        )
        return shortcutDisplayArray
    };
    

    return (
        <section className={`${home_styles.shortcuts} ${styles.shortcuts}`}>      
            {shortcutDisplay()}
        </section>
    )
}

export default Shortcuts;