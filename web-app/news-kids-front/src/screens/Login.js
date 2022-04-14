import { styled, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import AuthInput from "../components/auth/AuthInput";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { theme } from "../styles";
import BottomBox from "../components/auth/BottomBox";

function Login() {
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
                        {...register('id')}
                        name="id"
                        label="아이디"
                        type="text"
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
                    <AuthButton type="submit">로그인</AuthButton>
                </form>
            </FormBox>
            <BottomBox cta="계정이 없으신가요?" linkText="회원가입" link={`/sign-up`} />
        </AuthLayout>
    )
}

export default Login;

const MyLogo = styled(Typography)({
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    marginBottom: '25px'
});