import { Button, ButtonGroup, styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import { theme } from "../../styles";
import EditFormBox from "./EditFormBox";

function MenuHeader() {

    return (
        <EditFormBox>
            <ButtonGroup style={{ width: '100%' }} variant="text" aria-label="outlined primary button group">
                <HeaderButton >
                    <Link to={`/accounts/edit`}>
                        프로필 편집
                    </Link>
                </HeaderButton>
                <HeaderButton >
                    <Link to={`/accounts/password/change`}>
                        비밀번호 변경
                    </Link>
                </HeaderButton>
                <HeaderButton >
                    <Link to={`/accounts/delete`}>
                        회원탈퇴
                    </Link>
                </HeaderButton>
            </ButtonGroup>
        </EditFormBox>
    );
}

export default MenuHeader;

const HeaderButton = styled(Button)({
    width: '100%',
    color: theme.palette.primary.contrastText,
})
