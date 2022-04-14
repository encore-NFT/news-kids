import logo from '../images/news-kids-logo.svg';
import { useForm } from "react-hook-form";
import AuthInput from "../components/auth/AuthInput";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import BottomBox from "../components/auth/BottomBox";
import LogoImg from '../components/auth/LogoImg';

function Login() {
    const { register, handleSubmit, clearErrors } = useForm();
    const onSubmitValid = (data) => {
        console.log(data)
    };
    const clearLoginError = () => {
        clearErrors("result");
    }
    return (
        <AuthLayout>
            <FormBox>
                <LogoImg width="230px" height="40px" src={logo} alt="굿즈 로고" />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput
                        {...register('name', {
                            required: "사용자 아이디는 필수입니다."
                        })}
                        onChange={clearLoginError}
                        name="name"
                        label="아이디"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('password', {
                            required: "비밀번호는 필수입니다."
                        })}
                        onChange={clearLoginError}
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