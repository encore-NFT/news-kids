import { Grid, Paper, styled, Toolbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileApis from "../api/ProfileApis";
import EditButton from "../components/profile/EditButton";
import ContainerLayout from "../components/shared/ContainerLayout";
import UnderLine from "../components/shared/UnderLine";

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
            <Toolbar>
                <Typography variant="h4">{data?.profile?.user_name}</Typography>
                <Link to={`/editProfile`}>
                    <EditButton>프로필 편집</EditButton>
                </Link>
            </Toolbar>
            <MyInfo>{data?.profile?.user_nickname}</MyInfo>
            <MyInfo>안녕하세요. {data?.profile?.user_name} 입니다.</MyInfo>
            <UnderLine />
        </ContainerLayout>
    )
}

export default Profile;

const MyInfo = styled(Typography)({
    textAlign: 'left',
    padding: '0px 24px',
})
