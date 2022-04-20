import ContainerLayout from '../shared/ContainerLayout'
import { Grid, Typography, styled, Toolbar, Button } from '@material-ui/core'
import ContentLayout from '../shared/ContentLayout';

function NewsList({
    news_id,
    news_source,
    news_writer,
    news_date,
    news_url,
    news_title,
    news_image,
    news_article,
    keyword,
    thumbnails,
    comments,
    liked_users
}) {
    console.log(Object.keys(comments).length === 0);
    return (
        <ContainerLayout>
            <ContentLayout>
                <NewsInfo variant='h4' component='h4'>
                    {news_source} | {news_writer}
                </NewsInfo>
                <NewsInfo variant='h1' component='h1'>
                    {news_title}
                </NewsInfo>
                <Toolbar>
                    <NewsInfo>{news_date} </NewsInfo>
                    <Button variant='outlined' href={news_url} size='small'>기사원문</Button>
                </Toolbar>
                {/* <img className={classes.image} src={news_image}/> */}
                <img src={news_image} alt={"뉴스 썸네일"}/>
                {/* <Grid item className={classes.itemArea}></Grid> */}
                <NewsInfo>
                    {news_article}
                </NewsInfo>
                <Toolbar>
                    <NewsInfo variant='h2' component='h2'>{keyword.keyword}</NewsInfo>
                    <NewsInfo>{keyword.definition}</NewsInfo>
                </Toolbar>
                <Grid container spacing={3}>
                    {thumbnails.map((thumb, index) => (
                        <Grid item xs={4} key={index}>
                            <img src={thumb} alt={"뉴스 썸네일"}/>
                        </Grid>
                    ))}
                </Grid>
                <NewsInfo> {liked_users} |  </NewsInfo>
                {comments.map((comment, index) => (
                    <NewsInfo key={index}>{comment.content}</NewsInfo>
                ))}
            </ContentLayout>
        </ContainerLayout>
    );
};

export default NewsList;

const NewsInfo = styled(Typography)({
    textAlign: 'left',
    padding: '0px 0px 0px 20px',
})