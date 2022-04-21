import { Grid, Paper, styled, Typography } from "@material-ui/core";
import Thumbnail from "./Thumbnail";

function CommentNews({ comments, visible }) {

    return (
        <>
            {comments?.slice(0, visible).map((comment) => (
                <CommentContainers key={comment.id}>
                    <Grid container alignItems="center" wrap="nowrap" spacing={3}>
                        <Grid item>
                            <Thumbnail url={comment.news.news_image} alt={comment.news.news_title} />
                        </Grid>
                        <Grid item xs>
                            <NewsTitle>{comment.news.news_title}</NewsTitle>
                            <Comment>{comment.content}</Comment>
                            <NewsTime>{comment.timestamp}</NewsTime>
                        </Grid>
                    </Grid>
                </CommentContainers>
            ))}
        </>
    )
}
export default CommentNews;

const NewsTitle = styled(Typography)({
    textAlign: 'left',
    fontWeight: '500',
    margin: '0px 15px 20px 0px',
})

const Comment = styled(Typography)({
    textAlign: 'left',
    fontSize: '16px',
    margin: '0px 15px 5px 0px',
})

const NewsTime = styled(Typography)({
    textAlign: 'left',
    fontSize: '12px',
    margin: '0px 15px 5px 0px',
    width: '100%'
})

const CommentContainers = styled(Paper)({
    margin: '15px 5px',
    border: '0.5px solid #eeeeee',
    minWidth: '200px'
})
