import { useState, useEffect } from 'react';
import NewsApis from '../api/NewsApis';
import NewsList from '../components/news/NewsList';
import DictSearch from '../components/shared/DictSearch';


function Home() {
    const TOKEN = localStorage.getItem("Authorization");
    const [news, setNews] = useState([]);

    const readNewsList = async (TOKEN) => {
        try {
            const response = await NewsApis.getNewsList(TOKEN);
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
        readNewsList(TOKEN);
    }, [TOKEN]);


    return (
        <>
            <DictSearch />
            {news.map((news) => (
                <NewsList key={news.news_id} TOKEN={TOKEN} {...news} />
            ))}
        </>
    )
}

export default Home;