import { Button, ButtonGroup, styled } from "@material-ui/core";
import { useForm } from "react-hook-form";
import AuthInput from "../components/auth/AuthInput";
import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import { theme } from "../styles";
import EditButton from "../components/editProfile/EditButton";
import { Link } from "react-router-dom";

function EditProfile() {

    const { register, handleSubmit } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        console.log(data);
    };

    return (
        <EditLayout>
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
            <EditFormBox>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput
                        {...register('user_name')}
                        name="user_name"
                        label="아이디"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('user_nickname')}
                        name="user_nickname"
                        label="닉네임"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('user_introduce')}
                        name="user_introduce"
                        label="소개"
                        multiline
                        minRows={6}
                        variant="outlined"
                    />
                    <AuthInput
                        {...register('email', {
                            pattern: {
                                value: /^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                message: "이메일 형식이 아닙니다."
                            },
                        })}
                        name="email"
                        label="이메일"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <EditButton type="submit">제출</EditButton>
                    {/* <FormError message={errors?.result?.message} /> */}
                </form>
            </EditFormBox>
        </EditLayout>
    )
}

export default EditProfile;
const HeaderButton = styled(Button)({
    width: '100%',
    color: theme.palette.primary.contrastText
})
