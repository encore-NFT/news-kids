import { styled, Toolbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileApis from "../api/ProfileApis";
import EditButton from "../components/profile/EditButton";
import ContainerLayout from "../components/shared/ContainerLayout";
import ContentLayout from "../components/shared/ContentLayout";
import UnderLine from "../components/shared/UnderLine";
import LikeNews from "../components/profile/LikeNews";
import CommentNews from "../components/profile/CommentNews";

function Profile() {
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
                <LikeNews likes={data?.record?.like} />
                <MyRecord>내가 작성한 댓글</MyRecord>
                <CommentNews comments={data?.record?.comment} />
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
    margin: '20px 0px 10px 5px',
})
