import { Button, Grid, styled, Toolbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileApis from "../api/ProfileApis";
import EditButton from "../components/profile/EditButton";
import ContainerLayout from "../components/shared/ContainerLayout";
import ContentLayout from "../components/shared/ContentLayout";
import UnderLine from "../components/shared/UnderLine";
import LikeNews from "../components/profile/LikeNews";
import CommentNews from "../components/profile/CommentNews";
import { theme } from "../styles";

function CommentProfile() {
    const TOKEN = localStorage.getItem("Authorization");

    const location = useLocation();
    const userName = location.state;
    const userData = { userName, TOKEN };

    const [otherData, setOtherData] = useState("");
    const getOtherProfile = async (userData) => {
        try {
            const response = await ProfileApis.getOtherUser(userData);
            console.log("댓글 프로필 response", response);
            const profileData = response.data.data;
            return setOtherData(profileData);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getOtherProfile(userData);
    }, [userData]);


    const [showLike, setShowLike] = useState(4);
    const [showComment, setShowComment] = useState(2);

    const showMoreLike = () => {
        setShowLike(prevValue => prevValue + 4);
    }
    const showMoreComment = () => {
        setShowComment(prevValue => prevValue + 2);
    }

    return (
        <>
            {otherData?.master ?
                <ContainerLayout>
                    <ContentLayout>
                        <Toolbar>
                            <Typography variant="h4">{otherData?.profile?.user_name}</Typography>
                            <Link to={`/accounts/edit`}>
                                <EditButton>프로필 편집</EditButton>
                            </Link>
                        </Toolbar>
                        <MyInfo>{otherData?.profile?.user_nickname}</MyInfo>
                        {otherData?.profile?.user_introduce !== "" ?
                            <MyInfo>{otherData?.profile?.user_introduce}</MyInfo>
                            : <MyInfo>안녕하세요. {otherData?.profile?.user_name} 입니다.</MyInfo>}
                        <UnderLine />
                        <Grid container spacing={1} alignItems='center' style={{ margin: '20px 0px 10px 0px' }}>
                            <Grid item>
                                <MyRecord>내가 좋아요한 뉴스</MyRecord>
                            </Grid>
                            <Grid item>
                                <ShowButton variant='outlined' size='small' onClick={showMoreLike}>더보기</ShowButton>
                            </Grid>
                        </Grid>
                        <LikeNews likes={otherData?.record?.like} visible={showLike} />
                        <Grid container spacing={1} alignItems='center' style={{ margin: '20px 0px 10px 0px' }}>
                            <Grid item>
                                <MyRecord>내가 작성한 댓글</MyRecord>
                            </Grid>
                            <Grid item>
                                <ShowButton variant='outlined' size='small' onClick={showMoreComment}>더보기</ShowButton>
                            </Grid>
                        </Grid>
                        <CommentNews comments={otherData?.record?.comment} visible={showComment} />
                    </ContentLayout>
                </ContainerLayout>
                :
                <ContainerLayout>
                    <ContentLayout>
                        <Toolbar>
                            <Typography variant="h4">{otherData?.profile?.user_name}</Typography>
                        </Toolbar>
                        <MyInfo>{otherData?.profile?.user_nickname}</MyInfo>
                        {otherData?.profile?.user_introduce !== "" ?
                            <MyInfo>{otherData?.profile?.user_introduce}</MyInfo>
                            : <MyInfo>안녕하세요. {otherData?.profile?.user_name} 입니다.</MyInfo>}
                        <UnderLine />
                        <Grid container spacing={1} alignItems='center' style={{ margin: '20px 0px 10px 0px' }}>
                            <Grid item>
                                <MyRecord>{otherData?.profile?.user_name}님이 좋아요한 뉴스</MyRecord>
                            </Grid>
                            <Grid item>
                                <ShowButton variant='outlined' size='small' onClick={showMoreLike}>더보기</ShowButton>
                            </Grid>
                        </Grid>
                        <LikeNews likes={otherData?.record?.like} visible={showLike} />
                        <Grid container spacing={1} alignItems='center' style={{ margin: '20px 0px 10px 0px' }}>
                            <Grid item>
                                <MyRecord>{otherData?.profile?.user_name}님이 작성한 댓글</MyRecord>
                            </Grid>
                            <Grid item>
                                <ShowButton variant='outlined' size='small' onClick={showMoreComment}>더보기</ShowButton>
                            </Grid>
                        </Grid>
                        <CommentNews comments={otherData?.record?.comment} visible={showComment} />
                    </ContentLayout>
                </ContainerLayout>
            }
        </>
    )
}

export default CommentProfile;

const MyInfo = styled(Typography)({
    textAlign: 'left',
    padding: '0px 24px',
})

const ShowButton = styled(Button)({
    padding: '1px',
    fontSize: '12px',
    color: theme.palette.secondary.contrastText,
})

const MyRecord = styled(Typography)({
    textAlign: 'left',
    fontWeight: '700',
    fontSize: '16px',
})
