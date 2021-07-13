import React, { useState, useRef } from 'react';
import styles from './home.module.scss';


const NewsApi = () => {
    const [newsStories, setNewsStories] = useState();
    const intialRender = useRef(0)

    const fetchNews = () => {

        const url = 'https://newsapi.org/v2/top-headlines?sources=google-news-uk&apiKey=f7aeda8412054e7d8412a05bd170cf85';

        fetch(url, {
            method: 'GET'
        })
        .then(response => {
            if(response.status === 200){ 
                 
                console.log('Current Request Successfull')            
                return response.json();
            } else { 
                
                throw new Error(
                    'News API not successfull.\r\n HTTP Status: '  + response.status
                );
            }}
        )
        .then(data => {
            console.log(data);
            setNewsStories(() => {
            return [

            ]
            })}
        )
        .catch( error => {           
            alert(error);
        });

    }
    
    if(intialRender.current === 0){
        intialRender.current += 1;
        //fetchNews();
    }

    return (
        <section className={styles.news_api}>
            <h2></h2>
        </section>
    )
}

export default NewsApi;