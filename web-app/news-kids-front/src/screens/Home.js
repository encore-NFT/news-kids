import { useState, useEffect } from 'react';
import NewsApis from '../api/NewsApis';
import NewsList from '../components/news/NewsList';


function Home() {
    const TOKEN = localStorage.getItem("Authorization");
    const [news, setNews] = useState([]);
    // console.log("Token "+null)
    const readNewsLists = async (TOKEN) => {
        try {
            const response = await NewsApis.getNewsList(TOKEN);
            if (response.status === 200) {
                console.log(response.data);
                setNews(response.data.data);
            } else {
                alert(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readNewsLists(TOKEN);
    }, [TOKEN]);
    

    return (
        <>
            {news.map((news) => (
                <NewsList key={news.news_id} {...news}/>
            ))}
        </>
    )
}

export default Home;