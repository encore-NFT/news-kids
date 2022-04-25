import { Grid, Typography, styled, Button, Container, InputBase, Drawer } from '@material-ui/core'
import { theme } from '../../styles';
import UnderLine from '../shared/UnderLine';
import styledComponent from 'styled-components';
import Like from './Like';
import Comment from './Comment'
import { useForm } from 'react-hook-form';
import NewsApis from '../../api/NewsApis';
import { useState } from 'react';
import CommentUnderLine from '../shared/CommentUnderLine';
import ErrorMessage from '../shared/Message';

function NewsList({
    TOKEN,
    news_id, news_source, news_title, news_date,
    news_url, news_image, news_article, keyword,
    thumbnails, like_count, like_status, comments,
}) {
    const [likeCount, setLikeCount] = useState(like_count);
    const [likeStatus, setLikeStatus] = useState(like_status);
    const [commentCount, setCommentCount] = useState(comments.length);
    const [commentList, setCommentList] = useState(comments);

    const { register, handleSubmit, reset } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        const writeData = { data, TOKEN, news_id };
        postComment(writeData);
        reset();
        if (message !== undefined) {
            setTimeout(handleDrawerClose, 2000);
        }
    };

    const [open, setOpen] = useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [message, setMessage] = useState("");

    const postComment = async (writeData) => {
        try {
            const response = await NewsApis.postComment(writeData);
            setCommentList([...commentList, response.data.data]);
            setCommentCount(commentCount + 1);
        } catch (error) {
            if (error.response.status === 401) {
                const message = error.response.data.message;
                setOpen(true);
                return setMessage(message);
            } else {
                console.log(error);
            }
        }
    }

    const deleteComment = async (comments_id) => {
        try {
            const deleteData = { comments_id, TOKEN }
            await NewsApis.deleteComment(deleteData);
            setCommentList(commentList.filter(comment => {
                return comment.comments_id !== comments_id;
            }));
            setCommentCount(commentCount - 1);
        } catch (error) {
            if (error.response.status === 401) {
                const message = error.response.data.message;
                return setMessage(message);
            }
        }
    };

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
                        <NewsInfo> {news_date} </NewsInfo>
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

                <UnderLine />

                { news_image ? <NewsImage src={news_image} alt={"뉴스 이미지"} /> : null}

                <NewsArticle>
                    {news_article}
                </NewsArticle>

                <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                        <Keyword
                            variant='h2'
                            component='h2'
                            style={{
                                'textDecoration': 'underline',
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
                            <ThumbImage src={thumb} alt={"뉴스 썸네일"} />
                        </Grid>
                    ))}
                </Grid>

                <Grid container
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid item>
                        <NewsInfo>
                            {likeCount ? `좋아요 ${likeCount}개 ` : null}
                            {commentCount ? `댓글 ${commentCount}개 ` : null}
                        </NewsInfo>
                    </Grid>
                    <Grid item>
                        <Like
                            TOKEN={TOKEN}
                            newsId={news_id}
                            likeStatus={likeStatus}
                            setLikeStatus={setLikeStatus}
                            likeCount={likeCount}
                            setLikeCount={setLikeCount}
                        />
                    </Grid>
                </Grid>

                <CommentUnderLine />

                {commentList.map((comment) =>
                    <Comment
                        key={comment.comments_id}
                        {...comment}
                        deleteComment={deleteComment}
                        message={message}
                    />
                )}

                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <InputBase
                        {...register('content', {
                            required: true
                        })}
                        name="content"
                        type="text"
                        fullWidth
                        placeholder="댓글 달기..."
                    />
                </form>
                <Drawer
                    variant="persistent"
                    anchor="bottom"
                    open={open}
                >
                    <ErrorMessage>
                        {message}
                    </ErrorMessage>
                </Drawer>
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
    height: 70%;
    border-radius: 4px;
`