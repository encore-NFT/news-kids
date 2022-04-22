import { IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useEffect, useMemo, useState } from 'react';

function Like({ newsId, likeCount, likeStatus }) {

    const [toggleLike, setToggleLike] = useState(likeStatus);

    const ButtonHandler = () => {
        setToggleLike(likeStatus => !likeStatus);
        console.log(likeCount)
    }

    return (
        <>
            <IconButton onClick={ButtonHandler}>
                {toggleLike ? <FavoriteIcon fontSize='large' color='secondary'/> : <FavoriteBorderIcon fontSize='large'/>}
            </IconButton>
        </>
    )
}
export default Like;