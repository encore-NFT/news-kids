import { useState, useEffect } from 'react';
import NewsApis from '../api/NewsApis';
import NewsList from '../components/news/NewsList';

import { useLocation } from "react-router-dom";
import DictSearch from '../components/shared/DictSearch';

function News() {
    const TOKEN = localStorage.getItem("Authorization");

    const location = useLocation();
    const newsId = location.pathname.replace('/news/', '')
    const newsData = { newsId, TOKEN };

    const [news, setNews] = useState([]);

    const readNews = async (newsData) => {
        try {
            const response = await NewsApis.getNews(newsData);
            if (response.status === 200) {
                setNews(response.data.data);
            } else {
                alert(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readNews(newsData);
    }, [TOKEN]);

    return (
        <>
            <DictSearch />
            {news && news.length !== 0 ? <NewsList TOKEN={TOKEN} {...news} /> : null}
        </>
    )
}

export default News;