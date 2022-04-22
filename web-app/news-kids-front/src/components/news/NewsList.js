import { Grid, Typography, styled, Button, Container, InputBase } from '@material-ui/core'
import { theme } from '../../styles';
import UnderLine from '../shared/UnderLine';
import styledComponent from 'styled-components';
import Like from './Like';
import Comment from './Comment'

function NewsList({
    news_id,
    news_source,
    news_title,
    news_date,
    news_writer,
    news_url,
    news_image,
    news_article,
    keyword,
    thumbnails,
    like_count,
    like_status,
    comments
}) {
    const likeCount = like_count
    const commentCount = comments.length

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
                        <NewsButton 
                            variant='outlined' 
                            href={news_url} 
                            size='small'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            기사원문
                        </NewsButton>
                    </Grid>
                </Grid>

                <UnderLine/>

                <NewsImage src={news_image} alt={"뉴스 이미지"}/>

                <NewsArticle>
                    {news_article}
                </NewsArticle>

                <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                        <Keyword
                            variant='h2' 
                            component='h2'
                            style={{
                                'textDecoration':'underline',
                                'textUnderlinePosition': 'under'
                            }}
                        >
                            {keyword.keyword}
                        </Keyword>
                    </Grid>
                    <Grid item>
                        <Keyword>{keyword.definition}</Keyword>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    {thumbnails.map((thumb, index) => (
                        <Grid item xs={4} key={index}>
                            <ThumbImage src={thumb} alt={"뉴스 썸네일"}/>
                        </Grid>
                    ))}
                </Grid>

                <Like newsId={news_id} likeCount={like_count} likeStatus={like_status}/>
                
                <NewsInfo> 
                    {`좋아요 ${likeCount}개 댓글 ${commentCount}개`}
                </NewsInfo>

                {comments.map((comment, index) => (
                    <Comment 
                        key={index} 
                        newsId={news_id} 
                        comment={comment}
                        commentCount={commentCount}
                    />
                ))}

                <UnderLine/>

                <form>
                    <SearchGrid>
                        <InputBase
                            name="word"
                            type="text"
                            placeholder="댓글 달기..."
                        />
                    </SearchGrid>
                </form>
            </NewsContent>
        </NewsContainer>
    );
};

export default NewsList;

const NewsContainer = styled(Container)({
    border: '0.5px solid #eaeaea',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    padding: '3em 0em',
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
    margin: '8px 0px',
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
    whiteSpace: 'pre-line',
    fontSize: '20px',
    margin: '20px 0px 80px 0px',
    lineHeight: '32px',
    color: theme.palette.primary.contrastText,
})

const Keyword = styled(Typography)({
    textAlign: 'left',
    margin: '0px 0px',
    lineHeight: '24px',
})

const ThumbImage = styledComponent.img`
    text-aline: center;
    margin: 20px auto;
    width: 100%;
    height: 104px;
    border-radius: 4px;
`

const SearchGrid = styledComponent.div`
    display: flex;
    padding: 2px 10px;
    svg{
        height: 100%;
        margin-right: 5px;
        color: ${theme.palette.secondary.contrastText};
    }
`