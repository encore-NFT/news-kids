import { IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useEffect, useMemo } from 'react';

function Like({newsId, likeCount, likeStatus}) {
    const ButtonHandler = (e) => {
        likeStatus = !likeStatus;
        console.log(likeStatus?"true":"false")
    }

    // const likeButton = () => {
    //     likeStatus ? <FavoriteIcon fontSize='large'/> : <FavoriteBorderIcon fontSize='large'/>
    // }

    const likeButton = likeStatus ? <FavoriteIcon fontSize='large'/> : <FavoriteBorderIcon fontSize='large'/>
    useEffect=(()=>{
        likeButton
    })
    
    return (
        <>
            <IconButton color='secondary' onClick={ButtonHandler}>
                {likeButton}
            </IconButton>
        </>
    )
}
export default Like;