import { Typography, styled, Grid } from '@material-ui/core'
import { theme } from '../../styles';
import UnderLine from '../shared/UnderLine';

function Comment({comment, commentCount, newsId}) {
    console.log(comment)
    return (
        <>
            <UnderLine/>
            <UserComment> {comment.user} </UserComment>
            <NewsInfo> {comment.timestamp} </NewsInfo>
            <CommentContent>{comment.content}</CommentContent>
        </>
    )
}

export default Comment;

const UserComment = styled(Typography)({
    textAlign: 'left',
    margin: '0px 0px',
    lineHeight: '24px',
    fontWeight: 'bold',
    color: theme.palette.primary.contrastText,
})

const CommentContent = styled(Typography)({
    textAlign: 'left',
    margin: '4px 0px',
    lineHeight: '24px',
    fontSize: '16px',
    color: theme.palette.primary.contrastText,
})

const NewsInfo = styled(Typography)({
    textAlign: 'left',
    fontSize: '12px',
    color: theme.palette.secondary.contrastText,
})