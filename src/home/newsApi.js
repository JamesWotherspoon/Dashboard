import React, { useState, useRef } from 'react';
import styles from './home.module.scss';
import { BsClock } from 'react-icons/bs';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';



const NewsApi = () => {
    const [newsStories, setNewsStories] = useState();
    const [articleDisplay, setArticleDisplay] = useState(0);
    const intialRender = useRef(0)

    const fetchNews = () => {

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
                    'News API not successfull.\r\n HTTP Status: '  + response.status
                );
            }
        })
        .then(data => {
            console.log(data)
            const newsArray = []
            for(let i=0; i < 10; i++){
                newsArray.push({
                    title: data.articles[i].title,
                    source: data.articles[i].source.title,
                    description: data.articles[i].description,
                    published: data.articles[i].published,
                    link: data.articles[i].link
                })
            }
            setNewsStories(newsArray);
            localStorage.setItem('news', JSON.stringify({timeSaved: Date.now(), array: newsArray}))
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    if(intialRender.current === 0){
        intialRender.current += 1;
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
        }
    }

    const previousArticle = () => {
        if(articleDisplay === 0){
            setArticleDisplay(6)
        } else {
            setArticleDisplay((prev) => prev - 1)
        }
    }

    const nextArticle = () => {
        console.log(articleDisplay);
        if(articleDisplay === 6){
            setArticleDisplay(0)
        } else {
            setArticleDisplay((prev) => prev + 1)
        }
    }

    const displayNewsStories = (startingArticle) => {
        let newsDisplay = [];
        if(newsStories){
            for(let i=startingArticle; i < (startingArticle + 3); i++){
                newsDisplay.push(
                    <>
                        <div className={styles.news_article_container} key={newsStories[i].title} id={`_${i}`} onClick={() => {return null}}>
                            <div className={styles.news_article_title_container} >
                                <a href={newsStories[i].link} >
                                <h2 className={styles.news_article_title} >{newsStories[i].title}</h2>
                                </a>
                                <h6 className={styles.news_article_source} >
                                    {newsStories[i].source}
                                </h6>
                            </div>
                            <div>
                                <img src={newsStories[i].link} alt=''/>
                                
                                <h6 className={styles.news_article_published} >
                                    <BsClock className={styles.time_since_published_icon} />
                                    {newsStories[i].published}
                                </h6>
                            </div>
                        </div>
                    </>
                )
            }
        }
        return newsDisplay
    }

    return (
        <section className={styles.news_api}>
            <GrFormPrevious onClick={previousArticle} className={styles.arrow_icon} />
            {displayNewsStories(articleDisplay)}
            <GrFormNext onClick={nextArticle} className={styles.arrow_icon} />
        </section>
    )
}

export default NewsApi;