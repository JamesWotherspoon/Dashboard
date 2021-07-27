import React, { useState, useRef, useEffect} from 'react';
import styles from '../home.module.scss';

import NewsContentDisplay from './NewsContentDisplay';
import NewsErrorLoadingDisplay from './NewsErrorLoadingDisplay';

const NewsApi = () => {
    const [newsStories, setNewsStories] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();

    const year = useRef((new Date()).getFullYear());

    const fetchNews = () => {
        setIsLoading(true);

        fetch("https://google-news.p.rapidapi.com/v1/top_headlines?lang=en&country=UK", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "4bafd5e1eemsh66357a52315bcbbp1d5bdcjsnb1b8df1932af",
                "x-rapidapi-host": "google-news.p.rapidapi.com"
            }
        })
        .then(response => {
            if(response.status === 200){ 
         
                return response.json();
            } else { 
                
                throw new Error(
                    'HTTP Status: ' + response.status
                );
            }
        })
        .then(data => {

            const newsArray = []
            for(let i=0; i < 16; i++){
                let [title] = data.articles[i].title.split('-')
                let publishedDate  = data.articles[i].published
                publishedDate = publishedDate.substring(0, publishedDate.indexOf(`${year.current}`) + 4)

                newsArray.push({
                    title: title,
                    source: data.articles[i].source.title,
                    published: publishedDate,
                    link: data.articles[i].link
                })
            }

            setNewsStories(newsArray);
            localStorage.setItem('news', JSON.stringify({timeSaved: Date.now(), array: newsArray}))
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
            setErrorMessage(error.message);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        let newsStored = localStorage.getItem('news');
        newsStored = JSON.parse(newsStored);

        if(newsStored && (Date.now() - newsStored.timeSaved) < 1800000){           
            setNewsStories(newsStored.array);
        } else {
            fetchNews();
        };
    }, [])

    return (
        <section className={styles.news_api}>           
            {(newsStories) ? (
                <NewsContentDisplay newsStories={newsStories}/>
            ) : (
                <NewsErrorLoadingDisplay errorMessage={errorMessage} retryFetchNews={fetchNews} isLoading={isLoading}/>
            )}
        </section>
    )
}

export default NewsApi;