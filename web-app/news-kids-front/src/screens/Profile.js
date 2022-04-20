import { Grid, ImageList, ImageListItem, ImageListItemBar, makeStyles, Paper, styled, Toolbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileApis from "../api/ProfileApis";
import EditButton from "../components/profile/EditButton";
import ContainerLayout from "../components/shared/ContainerLayout";
import ContentLayout from "../components/shared/ContentLayout";
import UnderLine from "../components/shared/UnderLine";
import Thumbnail from "../components/profile/Thumbnail";

function Profile() {
    const classes = useStyles();
    const TOKEN = localStorage.getItem("Authorization");
    const [data, setData] = useState("");

    const getProfile = async (TOKEN) => {
        try {
            const response = await ProfileApis.getProfileList(TOKEN);
            console.log("프로필 response", response.data);
            const profileData = response.data.data;
            return setData(profileData);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProfile(TOKEN);
    }, [TOKEN]);

    return (
        <ContainerLayout>
            <ContentLayout>
                <Toolbar>
                    <Typography variant="h4">{data?.profile?.user_name}</Typography>
                    <Link to={`/editProfile`}>
                        <EditButton>프로필 편집</EditButton>
                    </Link>
                </Toolbar>
                <MyInfo>{data?.profile?.user_nickname}</MyInfo>
                <MyInfo>안녕하세요. {data?.profile?.user_name} 입니다.</MyInfo>
                <UnderLine />
                <MyRecord>내가 좋아요한 뉴스</MyRecord>
                <ImageList rowHeight={220} cols={4}>
                    {data?.record?.like.map((likes) => (
                        <ImageListItem key={likes.id} >
                            <Thumbnail lg url={likes.news_image} alt={likes.news_title} />
                            <ImageListItemBar
                                title={likes.news_title}
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
                <MyRecord>내가 작성한 댓글</MyRecord>
                {data?.record?.comment.map((comment) => (
                    <CommentContainers key={comment.id}>
                        <Grid container alignItems="center" wrap="nowrap" spacing={3}>
                            <Grid item>
                                <Thumbnail url={comment.news.news_image} alt={comment.news.news_title} />
                            </Grid>
                            <Grid item xs>
                                <CommentTitle>{comment.news.news_title}</CommentTitle>
                                <Comment>{comment.content}</Comment>
                                <NewsTime>{comment.timestamp}</NewsTime>
                            </Grid>
                        </Grid>
                    </CommentContainers>
                ))}
            </ContentLayout>
        </ContainerLayout>
    )
}

export default Profile;

const MyInfo = styled(Typography)({
    textAlign: 'left',
    padding: '0px 24px',
})

const MyRecord = styled(Typography)({
    textAlign: 'left',
    fontWeight: '700',
    fontSize: '16px',
    margin: '20px 0px 10px 10px',
})

const CommentTitle = styled(Typography)({
    textAlign: 'left',
    fontWeight: '500',
    margin: '0px 15px 20px 0px',
    minWidth: '120px'
})

const Comment = styled(Typography)({
    textAlign: 'left',
    fontSize: '16px',
    margin: '0px 15px 5px 0px',
})

const NewsTime = styled(Typography)({
    textAlign: 'left',
    fontSize: '12px',
    margin: '0px 15px 5px 0px',
    width: '100%'
})

const useStyles = makeStyles(() => ({
    title: {
        color: 'black',
        fontSize: '14px'
    },
    titleBar: {
        width: '217px',
        margin: '0 auto',
        background: '#fefefe',
        opacity: '1',
    },
}));

const CommentContainers = styled(Paper)({
    margin: '15px 10px',
    border: '0.5px solid #eeeeee',
    minWidth: '200px'
})
