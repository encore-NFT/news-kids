import { styled, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditButton from "../components/profile/EditButton";
import ContainerLayout from "../components/shared/ContainerLayout";
import UnderLine from "../components/shared/UnderLine";

function Profile(){
    return(
        <ContainerLayout>
            <Toolbar>
                <Typography variant="h4">정승헌</Typography>
                <Link to={`/editProfile`}>
                    <EditButton>프로필 편집</EditButton>
                </Link>
            </Toolbar>
            <MyInfo>sheon-j</MyInfo>
            <MyInfo>안녕하세요. 정승헌입니다.</MyInfo>
            <UnderLine />
        </ContainerLayout>
    )
}

export default Profile;

const MyInfo = styled(Typography)({
    textAlign: 'left',
    padding: '0px 24px',
})
