import { Typography, styled, Modal, ButtonGroup, Button } from '@material-ui/core'
import { theme } from '../../styles';
import UnderLine from '../shared/UnderLine';
import { useLocation, useNavigate } from "react-router-dom";
import styledComponent from 'styled-components';
import MoreVert from '@material-ui/icons/MoreVert'
import { useState } from 'react';
import NewsApis from '../../api/NewsApis';

function Comment({ comment }) {
    const navigate = useNavigate();

    const onClickHandler = (e) => {
        const user_name = e.target.getAttribute("value");
        navigate(`/profile/${user_name}`, {
            state: {
                user_name: user_name,
            }
        });
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const TOKEN = localStorage.getItem("Authorization");

    const onMenuHandler = (e) => {
        const comment_id = e.target.getAttribute("value");
        navigate(`/`, {
            state: {
                comment_id: comment_id,
            }
        });
        setOpen(true);
    };
    const location = useLocation();
    const commentId = location.state;

    const onDeleteHandler = () => {
        deleteComments(deleteData);
    };

    const deleteData = { commentId, TOKEN };

    const deleteComments = async (deleteData) => {
        try {
            const response = await NewsApis.deleteComment(deleteData);
            console.log("댓글삭제 response", response.data);
            handleClose();
            window.location.reload();

        } catch (err) {
            if (err.response.status === 401) {
                const message = err.response.data.message;
                handleClose();
                alert(message);
            }
        }
    };

    return (
        <>
            <UnderLine />
            <CommentContainers>
                <CommentContainer>
                    <UserComment onClick={((e) => onClickHandler(e))} value={comment.user}>{comment.user}</UserComment>
                    <NewsInfo>{comment.timestamp}</NewsInfo>
                </CommentContainer>
                <CommentContainer>
                    <MoreVert onClick={((e) => onMenuHandler(e))} value={comment?.comments_id} />
                    <UserModal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                    >
                        <ButtonGroup
                            orientation="vertical"
                            color="inherit"
                            aria-label="vertical contained primary button group"
                            variant="contained"
                            style={{ width: "400px", height: 'auto' }}
                        >
                            <ModalButton
                                size='large'
                                style={{ color: '#f23d4d' }}
                                onClick={onDeleteHandler}>삭제</ModalButton>
                            <ModalButton size='large' onClick={handleClose}>취소</ModalButton>
                        </ButtonGroup>
                    </UserModal>
                </CommentContainer>
            </CommentContainers>
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

const CommentContainers = styledComponent.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
`;
const CommentContainer = styledComponent.div``;

const UserModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const ModalButton = styled(Button)({
    padding: '0.7em 0',
    backgroundColor: '#ffffff',
})