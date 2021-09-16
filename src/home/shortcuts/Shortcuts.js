import React, { useState, useEffect, useMemo } from 'react';
import styles from './Shortcuts.module.scss';
import home from '../home.module.scss';
import AddNewShortcut from './AddNewShortcut';
import { BsThreeDots } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import bbc_image from '../../images/bbc_news.png';
import facebook_image from '../../images/facebook.png';
import youtube_image from '../../images/youtube.png';
import amazon_image from '../../images/amazon.jpg';
import netflix_image from '../../images/netflix.png';
import spotify_image from '../../images/spotify.png';
import wikipedia_image from '../../images/wikipedia.png';

import twitter_image from '../../images/twitter.jpg';

import { v4 as uuidv4 } from 'uuid';


const Shortcuts = () => {
    const [shortcutList, setShortcutList] = useState(
        Array(11).fill({   
            name: '',
            url: '',
            image: '',
            index: 0,
            formOpen: false}
        )
    );
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
        {   name: '',
            url: '',
            image: '',
            index: 8,
            formOpen: false},
        {   name: '',
            url: '',
            image: '',
            index: 9,
            formOpen: false},
        {   name: '',
            url: '',
            image: '',
            index: 10,
            formOpen: false},
    ], [])
    
    useEffect(() => {
        const storedShortcuts = JSON.parse( localStorage.getItem('shortcuts') );
        if(storedShortcuts === null){
            setShortcutList(presetShortcuts);
        } else {
            setShortcutList(storedShortcuts);
        }
    }, [presetShortcuts])

    useEffect(() => {
        localStorage.setItem('shortcuts', JSON.stringify(shortcutList));
    }, [shortcutList]);

    const addShortcut = (index, shortcutToAdd) => {
        const siteUrl = shortcutToAdd.url.replace('https://', '');
        const faviconUrl = `https://api.statvoo.com/favicon/?url=${siteUrl}`;
        setShortcutList(prev => {
            let shortcutListClone = [...prev];
            shortcutListClone[index] = {url: shortcutToAdd.url, name: shortcutToAdd.name, image: faviconUrl, formOpen: false};
            return shortcutListClone
        })
    }

    const deleteShortcut = (event, index) => {
        event.stopPropagation();
        setShortcutList(prev => {
            let shortcutListClone = [...prev];
            shortcutListClone[index] = {url: '', name: '', image: '', formOpen: false};
            return shortcutListClone
        })
    }


    const followLink = (i) => {
        if(shortcutEdit) return
        window.open(shortcutList[i].url, '_self');
    }
    
    const shortcutDisplay = () => {
        let shortcutDisplayArray = [];
        for(let i=0; i < 11; i++){
            if(shortcutList[i].name){
                shortcutDisplayArray.push(
                    <div key={`${shortcutList[i].name}_${i}`} className={`${styles.shortcut_square} ${(shortcutEdit) ? styles.shake : null}`} onClick={() => followLink(i)}>
                        {(shortcutEdit) ? (
                        <div className={styles.shortcut_delete_circle}>
                            <IoClose onClick={(event) => deleteShortcut(event, i)} className={styles.delete_shortcut}/>
                        </div>) : null }
                        <img src={(shortcutList[i].image)} alt={shortcutList[i].name} className={styles.favicon} />
                    </div> 
                )
            } else {
                shortcutDisplayArray.push(
                    <AddNewShortcut 
                        index={i} 
                        addShortcut={addShortcut} 
                        shortcutList={shortcutList} 
                        key={uuidv4()}
                        resetShortcuts={() => setShortcutList(presetShortcuts)}
                    />
                )
            }
        };

        return shortcutDisplayArray
    };
    

    return (
        <section className={`${home.shortcuts} ${styles.shortcuts}`}>      
            {shortcutDisplay()}
            <div className={`${styles.shortcut_square} ${styles.non_link_square}`} onClick={() => setShortcutEdit(prev => !prev)} >
                < BsThreeDots className={`${styles.edit_shortcut_icon} ${shortcutEdit ? styles.click_animation_forward : styles.click_animation_reverse }`}/>
            </div>        
        </section>
    )
}

export default Shortcuts;