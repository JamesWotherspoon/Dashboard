import React, { useState, useEffect, useCallback } from 'react';
import styles from './NewsApi.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { BsClock } from 'react-icons/bs';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';


export default function NewsContentDisplay({newsStories}) {
    const [currentArticleIndex, setCurrentArticleIndex] = useState(6);
    const [, setNumberArticlesDisplayed] = useState(3);
    const [transitionRight, setTransitionRight] = useState(false);
    const [transitionLeft, setTransitionLeft] = useState(false);
    const [clickArrowTimeout, setClickArrowTimeout] = useState({ previous: false, next: false })

    
    const nextArticle = () => {
        if(clickArrowTimeout.next) return 
        setTransitionRight(true)
        setClickArrowTimeout(prev => {return {...prev, next: true}});
        setTimeout(() => {
            setTransitionRight(false)
            if(currentArticleIndex === 12){
                setCurrentArticleIndex(0)
            } else {
                setCurrentArticleIndex((prev) => prev + 1)
            }
            setClickArrowTimeout(prev => {return {...prev, next: false}});
        }, 300)
    }

    const previousArticle = () => {
        if(clickArrowTimeout.previous) return
        setTransitionLeft(true)
        setClickArrowTimeout(prev => {return {...prev, previous: true}});
        setTimeout(() => {
            setTransitionLeft(false)
            if(currentArticleIndex === 0){
                setCurrentArticleIndex(12)
            } else {
                setCurrentArticleIndex((prev) => prev - 1)
            }
            setClickArrowTimeout(prev => {return {...prev, previous: false}});
        }, 300)
    }
    
    const handleResize = useCallback( () => {
            let viewportWidth = window.innerWidth;
            if(viewportWidth < 1000){
                setNumberArticlesDisplayed(2);
            } else if(viewportWidth > 900){
                setNumberArticlesDisplayed(3);
            }
    }, []) 
    

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [handleResize])

    const displayNewsArticle = (index) => {
            
        return (
            <div className={`${styles.news_article_container} ${transitionRight ? styles.article_slide_right : null}`} key={uuidv4()} id={`_${index}`} >
                <div className={styles.news_article_title_container}>
                    <a href={newsStories[index].link}>
                        <p className={styles.news_article_title}>
                            {newsStories[index].title}
                        </p>
                    </a>
                </div>
                <div className={styles.news_article_published_container}>
                    <h2 className={styles.news_article_source} >{newsStories[index].source}</h2>
                    <div className={styles.published_date_container}>
                        <BsClock className={styles.published_icon} />
                        <h6 className={styles.published_date}>{newsStories[index].published}</h6>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.news_api_content}`} >
            <div className={styles.news_articles_outer_container}>
                <GrFormPrevious onClick={previousArticle} className={`${styles.arrow_icon} ${styles.arrow_icon_left}`} />
                <div className={styles.news_articles_container}>
                    <div className={`${styles.news_article_transition_container} ${transitionRight ? styles.article_slide_right : null} ${transitionLeft ? styles.article_slide_left : null}`}>
                        {displayNewsArticle(currentArticleIndex)}
                    </div>
                    <div className={`${styles.news_article_transition_container} ${transitionRight ? styles.article_slide_right : null} ${transitionLeft ? styles.article_slide_left : null}`}>
                        {displayNewsArticle(currentArticleIndex + 1)}
                    </div>
                    <div className={`${styles.news_article_transition_container} ${transitionRight ? styles.article_slide_right : null} ${transitionLeft ? styles.article_slide_left : null}`}>
                        {displayNewsArticle(currentArticleIndex + 2)}
                    </div>
                    <div className={`${styles.news_article_transition_container} ${transitionRight ? styles.article_slide_right : null} ${transitionLeft ? styles.article_slide_left : null}`}>
                        {displayNewsArticle(currentArticleIndex + 3)}
                    </div>
                </div> 
                <GrFormNext onClick={nextArticle} className={`${styles.arrow_icon} ${styles.arrow_icon_right}`} />
            </div>
            
        </div>
    )
}
