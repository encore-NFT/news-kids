import { ImageList, ImageListItem, ImageListItemBar, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import Thumbnail from "./Thumbnail";

function LikeNews({ likes, visible }) {
    const classes = useStyles();

    return (
        <>
            <ImageList rowHeight={220} cols={4}>
                {likes?.slice(0, visible).map((like) => (
                    <Link to={`/news/${like.id}`} key={like.id}>
                        <ImageListItem style={{ height: 'auto', width: 'auto' }} >
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
                    </Link>
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