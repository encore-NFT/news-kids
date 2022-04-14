import { styled, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import AuthInput from "../components/auth/AuthInput";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { theme } from "../styles";
import BottomBox from "../components/auth/BottomBox";

function SignUp() {
    const { register, handleSubmit } = useForm();
    const onSubmitValid = (data) => {
        console.log(data)
    };
    return (
        <AuthLayout>
            <FormBox>
                <MyLogo variant="h4">News-Kids</MyLogo>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput
                        {...register('name')}
                        name="name"
                        label="아이디"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('nickname')}
                        name="nickname"
                        label="닉네임"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('email')}
                        name="email"
                        label="이메일"
                        type="email"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('password')}
                        name="password"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    <AuthButton type="submit">회원가입</AuthButton>
                </form>
            </FormBox>
            <BottomBox cta="계정이 있으신가요?" linkText="로그인" link={`/login`} />
        </AuthLayout>
    )
}

export default SignUp;

const MyLogo = styled(Typography)({
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    marginBottom: '25px'
});