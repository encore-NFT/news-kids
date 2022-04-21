import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import NewsApis from "../api/NewsApis";
import ContainerLayout from '../components/shared/ContainerLayout';
import ContentLayout from '../components/shared/ContentLayout';
import { Grid, Paper, styled, Typography } from '@material-ui/core';
import Thumbnail from '../components/profile/Thumbnail';

function Search() {
    const location = useLocation();
    const data = location.state;

    const [searchData, setSearchData] = useState("");

    const postSearch = async (data) => {
        try {
            const response = await NewsApis.postSearchNews(data);
            console.log("검색 response", response);
            const result = response.data.data;
            return setSearchData(result);

        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        postSearch(data);
    }, [data]);

    return (
        <>
            {searchData ?
                <ContainerLayout>
                    < ContentLayout >
                        {searchData?.map((search) => (
                            <Link to={`/news/${search.news_id}`} key={search.news_id}>
                                <CommentContainers>
                                    <Grid container alignItems="center" wrap="nowrap" spacing={3}>
                                        <Grid item>
                                            <Thumbnail url={search.news_image} alt={search.news_title} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <NewsTitle variant="h6" component="h3">{search.news_title}</NewsTitle>
                                            <NewsContent variant="body2">{search.news_article}</NewsContent>
                                            <NewsTime>{search.news_date} | {search.news_source}</NewsTime>
                                        </Grid>
                                    </Grid>
                                </CommentContainers>
                            </Link>
                        ))
                        }
                    </ContentLayout >
                </ContainerLayout > :
                null}
        </>
    )
}

export default Search;

const NewsTitle = styled(Typography)({
    textAlign: 'left',
    margin: '0px 15px 20px 0px',
    width: '100%',
})

const NewsContent = styled(Typography)({
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    height: '20px',
    width: '100%',
    margin: '0px 15px 5px 0px',
})

const NewsTime = styled(Typography)({
    textAlign: 'left',
    fontSize: '12px',
    margin: '0px 15px 5px 0px',
})

const CommentContainers = styled(Paper)({
    margin: '15px 5px',
    border: '0.5px solid #eeeeee',
    minWidth: '200px'
})