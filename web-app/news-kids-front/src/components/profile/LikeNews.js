import { ImageList, ImageListItem, ImageListItemBar, makeStyles } from "@material-ui/core";
import Thumbnail from "./Thumbnail";

function LikeNews({ likes, visible }) {
    const classes = useStyles();

    return (
        <>
            <ImageList rowHeight={220} cols={4}>
                {likes?.slice(0, visible).map((like) => (
                    <ImageListItem style={{ height: 'auto', width: 'auto' }} key={like.id}>
                        <Thumbnail lg url={like.news_image} alt={like.news_title} />
                        <ImageListItemBar
                            title={like.news_title}
                            position="bottom"
                            actionPosition="left"
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}

export default LikeNews;

const useStyles = makeStyles(() => ({
    title: {
        color: 'black',
        fontSize: '14px'
    },
    titleBar: {
        maxWidth: '180px',
        margin: '0 auto',
        background: '#fefefe',
        opacity: '0.95',
    },
}));