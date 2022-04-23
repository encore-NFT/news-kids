import { Typography, styled, Modal, ButtonGroup, Button, IconButton } from '@material-ui/core'
import { theme } from '../../styles';
import UnderLine from '../shared/UnderLine';
import { useNavigate } from "react-router-dom";
import styledComponent from 'styled-components';
import MoreVert from '@material-ui/icons/MoreVert'
import { useState } from 'react';

function Comment({
    comments_id, user, content, timestamp,
    deleteComment 
}) {
    
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDeleteHandler = () => {
        deleteComment(comments_id);
        handleClose();
    };

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`/profile/${user}`);
    };

    return (
        <>
            <CommentContainers>            
                <CommentContainer>
                    <UserComment onClick={onClickHandler}> {user} </UserComment>
                    <NewsInfo>{timestamp}</NewsInfo>
                </CommentContainer>
                
                <CommentContainer>
                    <IconButton onClick={handleOpen}>
                        <MoreVert/>
                    </IconButton>
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
                                onClick={onDeleteHandler}
                            >
                                삭제
                            </ModalButton>
                            <ModalButton 
                                size='large' 
                                onClick={handleClose}
                            >
                                취소
                            </ModalButton>
                        </ButtonGroup>
                    </UserModal>
                </CommentContainer>
            </CommentContainers>
            <CommentContent>{content}</CommentContent>
            <UnderLine/>
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