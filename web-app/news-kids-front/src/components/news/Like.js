import { IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import LikeApis from '../../api/LikeApis';

function Like({
    TOKEN, newsId, likeStatus, setLikeStatus, likeCount, setLikeCount
}) {
    const onClickHandler = () => {
        const newsData = { TOKEN, newsId };
        postLike(newsData);
    };

    const postLike = async (newsData) => {
        try {
            const response = await LikeApis.postLike(newsData);
            setLikeStatus(likeStatus => !likeStatus);
            likeStatus ? setLikeCount(likeCount-1) : setLikeCount(likeCount+1)
            console.log(likeStatus);

        } catch (error) {
            if (error.response.status === 401) {
                const message = error.response.data.message;
                alert(message);
            } else {
                console.log(error)
            }
        }
    };

    return (
        <>
            <IconButton onClick={onClickHandler}>
                {likeStatus ? <FavoriteIcon fontSize='large' color='secondary'/> : <FavoriteBorderIcon fontSize='large'/>}
            </IconButton>
        </>
    )
}
export default Like;