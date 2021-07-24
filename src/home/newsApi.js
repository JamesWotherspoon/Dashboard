import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './home.module.scss';
import { BsClock } from 'react-icons/bs';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
import { IoMdRefresh } from 'react-icons/io';

import { v4 as uuidv4 } from 'uuid';




const NewsApi = () => {
    const [newsStories, setNewsStories] = useState();
    const [articleDisplay, setArticleDisplay] = useState(0);
    const [errorMessage, setErrorMessage] = useState();
    const [loadingErrorState, setLoadingErrorState] = useState();
    const year = useRef((new Date()).getFullYear());

    const fetchNews = () => {

        console.log( 'fetch news triggered')

        fetch("https://google-news.p.rapidapi.com/v1/top_headlines?lang=en&country=UK", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "4bafd5e1eemsh66357a52315bcbbp1d5bdcjsnb1b8df1932af",
                "x-rapidapi-host": "google-news.p.rapidapi.com"
            }
        })
        .then(response => {
            if(response.status === 200){ 
                 
                console.log('Current Request Successfull')            
                return response.json();
            } else { 
                
                throw new Error(
                    'HTTP Status: ' + response.status
                );
            }
        })
        .then(data => {
            console.log(data)
            const newsArray = []
            for(let i=0; i < 10; i++){
                let [title] = data.articles[i].title.split('-')
                console.log(year)
                let publishedIndex = data.articles[i].published.indexOf(`${year.current}`) + 4;
                console.log(publishedIndex);
                let published = data.articles[i].published.slice(0, publishedIndex);
                console.log(published)
                newsArray.push({
                    title: title,
                    source: data.articles[i].source.title,
                    published: published,
                    link: data.articles[i].link
                })
            }
            setNewsStories(newsArray);
            localStorage.setItem('news', JSON.stringify({timeSaved: Date.now(), array: newsArray}))
        })
        .catch(err => {
            console.error(err);
            console.log(err);
            setErrorMessage(err);
        });
    }

    useEffect(() => {
        let newsStored = localStorage.getItem('news');
        if(newsStored !== null){
            newsStored = JSON.parse(newsStored)
            if((Date.now() - newsStored.timeSaved) < (1800000) ){
                setNewsStories(newsStored.array);
            } else {
                fetchNews();
            }
        } else {
            fetchNews();
        };
    }, [])

    const nextArticle = () => {
        if(articleDisplay === 6){
            setArticleDisplay(0)
        } else {
            setArticleDisplay((prev) => prev + 1)
        }
    }
    const previousArticle = () => {
        if(articleDisplay === 0){
            setArticleDisplay(6)
        } else {
            setArticleDisplay((prev) => prev - 1)
        }
    }

    const displayNewsStories = (startingArticle) => {
        let newsDisplay = [];
        if(newsStories){
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
        }
        return newsDisplay
    }
    const displayLoadingCircle = () => {
        setLoadingErrorState(
            <div className={`${styles.is_loading}`} >
                <div className={styles.loading_ring_container} >
                    <div className={styles.loading_ring} >
                    </div>
                </div>
            </div> 
        )
    }

    const errorRetryFetch = () => {
        displayLoadingCircle();
        fetchNews();
    }
    
    const loadingTimeExpired = () => {
        if(!newsStories){
            setLoadingErrorState(
                <div className={styles.error_message_container} key={uuidv4()}>
                        <div className={styles.retry_api}>
                            <IoMdRefresh  onClick={() => errorRetryFetch()}/>
                        </div>     
                        <div>
                            <h2>News API not successfull. </h2>
                            <h2>{errorMessage}</h2>
                        </div>         
                </div>
            )
        }
    }

    useEffect(()=> {

        displayLoadingCircle();

        let loadingTime = setTimeout(() => {
            loadingTimeExpired();
        }, 5000);

        return () => clearTimeout(loadingTime);
    }, [])

    return (
        <section className={styles.news_api}>
            {(newsStories) ? null : (
                loadingErrorState
            )}
            <div className={`${styles.news_api_content} ${(newsStories) ? styles.container_for_opacity_change_on_loaded : styles.container_for_opacity_change_on_loading}`} >
                <GrFormPrevious onClick={previousArticle} className={styles.arrow_icon} />
                {displayNewsStories(articleDisplay)}
                <GrFormNext onClick={nextArticle} className={styles.arrow_icon} />
            </div >
        </section>
    )
}

export default NewsApi;