import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import NewsApis from "../api/NewsApis";
import ContainerLayout from '../components/shared/ContainerLayout';
import ContentLayout from '../components/shared/ContentLayout';
import { Button, Grid, InputBase, Paper, styled, Typography } from '@material-ui/core';
import Thumbnail from '../components/profile/Thumbnail';
import UnderLine from '../components/shared/UnderLine';
import styledComponent from 'styled-components';
import { useViewport } from '../utils/ViewportProvider';
import { useForm } from 'react-hook-form';
import SearchContainer from '../components/search/SearchContiner';
import { Search } from "@material-ui/icons";
import { theme } from '../styles';
import DictSearch from '../components/shared/DictSearch';

function SearchPage() {
    const { width } = useViewport();
    const breakpoint = 740;

    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state;

    const [searchData, setSearchData] = useState("");
    const newsSum = Object.keys(searchData).length;

    const postSearch = async (data) => {
        try {
            const response = await NewsApis.postSearchNews(data);
            const result = response.data.data;
            return setSearchData(result);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        postSearch(data);
    }, [data]);

    const [showNews, setShowNews] = useState(5);

    const showMoreNews = () => {
        setShowNews(prevValue => prevValue + 5);
    };
    const { register, handleSubmit, reset } = useForm();

    const onSubmitValid = (data) => {
        navigate(`/search`, {
            state: {
                word: data.word,
            }
        });
        reset();
    };
    return (
        <>
            <DictSearch />
            {width < breakpoint ?
                <>
                    <SearchContainer>
                        <ContentLayout>
                            <form onSubmit={handleSubmit(onSubmitValid)}>
                                <SearchGrid>
                                    <div>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        {...register('word')}
                                        name="word"
                                        vtype="text"
                                        placeholder="검색"
                                        fullWidth
                                    />
                                </SearchGrid>
                            </form>
                        </ContentLayout>
                    </SearchContainer>
                    {searchData && newsSum !== 0 ?
                        <ContainerLayout>
                            < ContentLayout>
                                {data.word ?
                                    <Typography variant='h5' component="h1"><span style={{ color: "#4d88d8" }}>{data?.word}</span> 검색결과 {newsSum}건</Typography> :
                                    <Typography variant='h5' component="h1">전체 검색결과 {newsSum}건</Typography>}
                                <UnderLine />
                                {searchData?.slice(0, showNews).map((search) => (
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
                                <Button variant='outlined' size='small' onClick={showMoreNews}>더보기</Button>
                            </ContentLayout >
                        </ContainerLayout >
                        :
                        <ContainerLayout>
                            < ContentLayout>
                                <ErrorTitle variant='h6' component="h2"><span style={{ color: "#ff5f4e" }}>'{data?.word}'</span>에 대한 검색결과가 없습니다.</ErrorTitle>
                                <ErrorContent variant='body2'>모든 단어의 철자가 정확한지 확인해 보세요.</ErrorContent>
                                <ErrorContent variant='body2'>다른 검색어를 사용해보세요.</ErrorContent>
                                <ErrorContent variant='body2'>보다 일반적인 검색어로 다시 검색해 보세요.</ErrorContent>
                            </ContentLayout >
                        </ContainerLayout >}
                </>
                :
                <>
                    {searchData && newsSum !== 0 ?
                        <ContainerLayout>
                            < ContentLayout>
                                {data.word ?
                                    <Typography variant='h5' component="h1"><span style={{ color: "#4d88d8" }}>{data?.word}</span> 검색결과 {newsSum}건</Typography> :
                                    <Typography variant='h5' component="h1">전체 검색결과 {newsSum}건</Typography>}
                                <UnderLine />
                                {searchData?.slice(0, showNews).map((search) => (
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
                                <Button variant='outlined' size='small' onClick={showMoreNews}>더보기</Button>
                            </ContentLayout >
                        </ContainerLayout >
                        :
                        <ContainerLayout>
                            < ContentLayout>
                                <ErrorTitle variant='h6' component="h2"><span style={{ color: "#ff5f4e" }}>'{data?.word}'</span>에 대한 검색결과가 없습니다.</ErrorTitle>
                                <ErrorContent variant='body2'>모든 단어의 철자가 정확한지 확인해 보세요.</ErrorContent>
                                <ErrorContent variant='body2'>다른 검색어를 사용해보세요.</ErrorContent>
                                <ErrorContent variant='body2'>보다 일반적인 검색어로 다시 검색해 보세요.</ErrorContent>
                            </ContentLayout >
                        </ContainerLayout >}
                </>
            }
        </>
    )
}

export default SearchPage;

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

const ErrorTitle = styled(Typography)({
    textAlign: 'left',
    marginBottom: '30px',
})

const ErrorContent = styledComponent.li`
    text-align: left;
    margin: 0px 0px 5px 10px;
    font-size: 14px
`

const SearchGrid = styledComponent.div`
    display: flex;
    border-radius: 10px;
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
`

const SearchIcon = styled(Search)({
    height: '100%',
    marginRight: '5px',
    color: theme.palette.secondary.contrastText,
})