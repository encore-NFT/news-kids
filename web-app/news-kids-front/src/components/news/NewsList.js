import ContainerLayout from '../shared/ContainerLayout'
import { Grid, Typography, styled, Toolbar, Button, Container } from '@material-ui/core'
import ContentLayout from '../shared/ContentLayout';
import { theme } from '../../styles';
import UnderLine from '../shared/UnderLine';
import styledComponent from 'styled-components';

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
        <NewsContainer>
            <NewsContent>
                <NewsSource variant='h3' component='h3'>
                    {news_source}
                </NewsSource>

                <NewsTitle variant='h1' component='h1'>
                    {news_title}
                </NewsTitle>

                <Grid container spacing={1} alignItems='center'>
                    <Grid item>
                        <NewsInfo> {news_date} | {news_writer} </NewsInfo>
                        </Grid>
                    <Grid item>
                        <NewsButton variant='outlined' href={news_url} size='small'>기사원문</NewsButton>
                    </Grid>
                </Grid>

                <UnderLine/>

                <NewsImage src={news_image} alt={"뉴스 이미지"}/>

                <NewsArticle>
                    {news_article}
                </NewsArticle>

                <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                        <Typography variant='h5' component='h5'>{keyword.keyword}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{keyword.definition}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    {thumbnails.map((thumb, index) => (
                        <Grid item xs={4} key={index}>
                            <ThumbImage src={thumb} alt={"뉴스 썸네일"}/>
                        </Grid>
                    ))}
                </Grid>

                <NewsInfo> {liked_users} |  </NewsInfo>
                {comments.map((comment, index) => (
                    <NewsInfo key={index}>{comment.content}</NewsInfo>
                ))}
            </NewsContent>
        </NewsContainer>
    );
};

export default NewsList;

const NewsContainer = styled(Container)({
    border: '0.5px solid #eaeaea',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    padding: '2em 0em',
    boxShadow: '0px 0px 10px 1px #e2e2e2',
    textAlign: 'center',
    margin: '0 auto',
    marginBottom: '1rem'
});

const NewsContent = styled(Container)({
    width: '100%',
    maxWidth: '620px',
    minWidth: '350px',
    margin: '0 auto',
});

const NewsSource = styled(Typography)({
    textAlign: 'left',
    color: theme.palette.secondary.contrastText,
    fontSize: '16px',
    margin: '8px 0px'
})

const NewsTitle = styled(Typography)({
    textAlign: 'left',
    color: theme.palette.primary.contrastText,
    fontSize: '32px',
    margin: '8px 0px'
})

const NewsInfo = styled(Typography)({
    textAlign: 'left',
    fontSize: '14px',
    color: theme.palette.secondary.contrastText,
})

const NewsButton = styled(Button)({
    padding: '1px',
    fontSize: '12px',
    color: theme.palette.secondary.contrastText,
})

const NewsImage = styledComponent.img`
    text-aline: center;
    margin: 20px auto;
    width: 100%;
    border-radius: 10px;
`

const NewsArticle = styled(Typography)({
    textAlign: 'left',
    fontSize: '20px',
    margin: '20px 0px 80px 0px',
    lineHeight: '32px',
    color: theme.palette.primary.contrastText,
})

const ThumbImage = styledComponent.img`
    text-aline: center;
    margin: 20px auto;
    width: 100%;
    height: 104px;
    border-radius: 4px;
`