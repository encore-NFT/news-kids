import { Grid, Typography, styled, Button, Container, InputBase } from '@material-ui/core'
import { theme } from '../../styles';
import UnderLine from '../shared/UnderLine';
import styledComponent from 'styled-components';
import Like from './Like';
import Comment from './Comment'
import { useForm } from 'react-hook-form';
import NewsApis from '../../api/NewsApis';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

    console.log(commentList);

    // const navigate = useNavigate();

    // const onClickHandler = (news_id) => {
    //     navigate(`/`, {
    //         state: {
    //             news_id: news_id,
    //         }
    //     });
    // };

    // const location = useLocation();
    // const newsId = location.state;

    const { register, handleSubmit, reset } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        const writeData = { data, TOKEN, news_id };
        postComment(writeData);
    };

    const postComment = async (writeData) => {
        try {
            const response = await NewsApis.postComment(writeData);
            console.log("댓글 생성 response", response);
            reset();
            setCommentList([...commentList, response.data.data]);
        } catch (err) {
            if (err.response.status === 401) {
                const message = err.response.data.message;
                alert(message);
            } else {
                console.log(err)
            }
        }
    }

    const deleteComment = async (comments_id) => {
        try {
            const deleteData = { comments_id, TOKEN }
            const response = await NewsApis.deleteComment(deleteData);
            console.log("댓글 삭제 response", response);
            setCommentList(commentList.filter(comment => {
                return comment.comments_id !== comments_id;
            }));
        } catch (err) {
            if (err.response.status === 401) {
                const message = err.response.data.message;
                alert(message);
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

                <NewsImage src={news_image} alt={"뉴스 이미지"} />

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

                <Like 
                    TOKEN={TOKEN} 
                    newsId={news_id} 
                    likeStatus={likeStatus}
                    setLikeStatus={setLikeStatus}
                    likeCount={likeCount} 
                    setLikeCount={setLikeCount} 
                />

                <NewsInfo>
                    {`좋아요 ${likeCount}개 댓글 ${commentCount}개`}
                </NewsInfo>

                {commentList.map((comment, index) =>
                    <Comment
                        key={comment.comments_id}
                        {...comment}
                        deleteComment={deleteComment}
                    />
                )}

                {/* {
                    createComment && createComment !== undefined ?
                        <>
                            {comments.map((comment, index) => (
                                <Comment
                                    key={index}
                                    comment={comment}
                                    commentCount={commentCount}
                                />
                            ))}
                            <Comment
                                comment={createComment}
                                commentCount={commentCount}
                            />
                        </>
                        :
                        <>
                            {comments.map((comment, index) => (
                                <Comment
                                    key={index}
                                    comment={comment}
                                    commentCount={commentCount}
                                />
                            ))}
                        </>
                } */}

                {/* {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        newsId={news_id}
                        comment={comment}
                        commentCount={commentCount}
                    />
                ))} */}

                <UnderLine />
                
                {/* <form onSubmit={handleSubmit(onSubmitValid)} onClick={(() => onClickHandler(news_id))}> 
                */}
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <InputBase
                        {...register('content')}
                        name="content"
                        type="text"
                        fullWidth
                        placeholder="댓글 달기..."
                    />
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