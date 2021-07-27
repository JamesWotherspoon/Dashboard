import React, { useState } from 'react';
import styles from '../home.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { BsClock } from 'react-icons/bs';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';

export default function NewsContentDisplay({newsStories}) {
    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

    const nextArticle = () => {
        if(currentArticleIndex === 12){
            setCurrentArticleIndex(0)
        } else {
            setCurrentArticleIndex((prev) => prev + 1)
        }
    }
    const previousArticle = () => {
        if(currentArticleIndex === 0){
            setCurrentArticleIndex(12)
        } else {
            setCurrentArticleIndex((prev) => prev - 1)
        }
    }

    const displayNewsArticles = (startingArticle) => {
        const newsDisplay = [];
        
        for(let i=startingArticle; i < (startingArticle + 3); i++){
            
            newsDisplay.push(
                <div className={styles.news_article_container} key={uuidv4()} id={`_${i}`} >
                    <div className={styles.news_article_title_container} >
                        <a href={newsStories[i].link} >
                            <h2 className={styles.news_article_title} >{newsStories[i].title}</h2>
                        </a>
                        <h2 className={styles.news_article_source} >{newsStories[i].source}</h2>
                    </div>
                    <div className={styles.news_article_published_container}>
                        <BsClock />
                        <h6>{newsStories[i].published}</h6>
                    </div>
                </div>
            )
        }
        
        return newsDisplay
    }

    return (
        <div className={`${styles.news_api_content}`} >
            <GrFormPrevious onClick={previousArticle} className={styles.arrow_icon} />
            {displayNewsArticles(currentArticleIndex)}
            <GrFormNext onClick={nextArticle} className={styles.arrow_icon} />

        </div>
    )
}
