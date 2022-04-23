import { Drawer, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useState } from 'react';
import LikeApis from '../../api/LikeApis';
import ErrorMessage from '../shared/Message';

function Like({
    TOKEN, newsId, likeStatus, setLikeStatus, likeCount, setLikeCount
}) {
    const onClickHandler = () => {
        const newsData = { TOKEN, newsId };
        postLike(newsData);
        if (message !== undefined) {
            setOpen(true);
            setTimeout(handleDrawerClose, 2000);
        }
    };

    const [open, setOpen] = useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [message, setMessage] = useState("");

    const postLike = async (newsData) => {
        try {
            await LikeApis.postLike(newsData);
            setLikeStatus(likeStatus => !likeStatus);
            likeStatus ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
        } catch (error) {
            if (error.response.status === 401) {
                const message = error.response.data.message;
                return setMessage(message);
            } else {
                console.log(error)
            }
        }
    };

    return (
        <>
            <IconButton onClick={onClickHandler}>
                {likeStatus ? <FavoriteIcon fontSize='medium' color='secondary' /> : <FavoriteBorderIcon fontSize='medium' />}
            </IconButton>
            <Drawer
                variant="persistent"
                anchor="bottom"
                open={open}
            >
                <ErrorMessage>
                    {message}
                </ErrorMessage>
            </Drawer>
        </>
    )
}
export default Like;
