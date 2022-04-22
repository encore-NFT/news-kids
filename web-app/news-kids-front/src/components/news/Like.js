import { IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'


function Like({newsId, likeCount, likeStatus}) {
    
    return (
        <>
            <IconButton color='secondary'>
                {likeStatus?'True':'False'}
                {likeStatus ? <FavoriteIcon fontSize='large'/> : <FavoriteBorderIcon fontSize='large'/>}
            </IconButton>
            
            <Typography> {likeCount} </Typography>
        </>
    )
}

export default Like;