import { useState, useEffect } from 'react';
import NewsApis from '../api/NewsApis';
import NewsList from '../components/news/NewsList';
import DictSearch from '../components/shared/DictSearch';
import { Button, Container, Grid } from '@material-ui/core';
import ContainerLayout from '../components/shared/ContainerLayout';


function Home() {
    const TOKEN = localStorage.getItem("Authorization");
    const [news, setNews] = useState([]);

    const [showNews, setShowNews] = useState(5);

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

    const showMoreNews = () => {
        setShowNews(prevValue => prevValue + 5);
    };

    useEffect(() => {
        readNewsList(TOKEN);
    }, [TOKEN]);


    return (
        <>
            <DictSearch />
            {news?.slice(0,showNews).map((news) => (
                <NewsList key={news.news_id} TOKEN={TOKEN} {...news} />
            ))}
                <Container style={{
                    padding: '1em 0em',
                    textAlign: 'center',
                    margin: '0 auto',
                    marginBottom: '4rem'
                }}>
                    <Button
                        variant='outlined' 
                        size='small' 
                        onClick={showMoreNews}
                    >
                        더보기
                    </Button>
                </Container>
        </>
    )
}

export default Home;