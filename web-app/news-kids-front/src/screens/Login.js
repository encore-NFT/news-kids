import logo from '../images/news-kids-logo.svg';
import { useForm } from "react-hook-form";
import AuthInput from "../components/auth/AuthInput";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import BottomBox from "../components/auth/BottomBox";
import LogoImg from '../components/auth/LogoImg';
import AuthApis from '../api/AuthApis';
import FormError from '../components/auth/FormError';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmitValid = (data) => {
        postLogin(data)
    };

    const postLogin = async (data) => {
        try {
            const response = await AuthApis.postLogin(data);
            console.log("로그인 response", response);
        } catch (err) {
            console.log("Error", err);
        }
    }
    return (
        <AuthLayout>
            <FormBox>
                <LogoImg width="230px" height="40px" src={logo} alt="굿즈 로고" />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput
                        {...register('id', {
                            required: "사용자 아이디는 필수입니다."
                        })}
                        name="id"
                        label="아이디 또는 이메일"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    {errors.id && (<FormError message={errors.id.message} />)}
                    <AuthInput
                        {...register('password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        name="password"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors.password && (<FormError message={errors.password.message} />)}
                    <AuthButton type="submit">로그인</AuthButton>
                </form>
            </FormBox>
            <BottomBox cta="계정이 없으신가요?" linkText="회원가입" link={`/sign-up`} />
        </AuthLayout>
    )
}

export default Login;