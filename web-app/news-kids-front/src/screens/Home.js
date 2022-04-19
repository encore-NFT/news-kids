import { useState, useEffect } from 'react';
import NewsApis from '../api/NewsApis';
import NewsList from '../components/news/NewsList';


function Home() {
    
    const [news, setNews] = useState([]);
    
    const readNewsLists = async () => {
        try {
            const response = await NewsApis.getNewsList();
            if (response.status === 200) {
                console.log(response.data);
                setNews(response.data.data);
                console.log(news);
            } else {
                alert(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readNewsLists();
    }, []);
    

    return (
        <>
            {news.map((news) => (
                <NewsList key={news.news_id} {...news}/>
            ))}
        </>
    )
}

export default Home;