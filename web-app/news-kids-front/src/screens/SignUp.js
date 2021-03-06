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
import { Link, useNavigate } from 'react-router-dom';


function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        postSignup(data);
        navigate(`/login`);
    };

    const postSignup = async (data) => {
        try {
            await AuthApis.postRegister(data);
        } catch (error) {
            if (error.response.status === 409) {
                return setError("result", {
                    message: error.response.data.message,
                });
            }
        }
    }

    const clearLoginError = () => {
        clearErrors("result");
    }
    return (
        <AuthLayout>
            <FormBox>
                <Link to={`/`}>
                    <LogoImg width="230px" height="40px" src={logo} alt="굿즈 로고" />
                </Link>
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
                    {errors?.name && (<FormError message={errors?.name?.message} />)}
                    <AuthInput
                        {...register('nickname')}
                        name="nickname"
                        label="닉네임"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('email', {
                            required: "이메일은 필수입니다.",
                            pattern: {
                                value: /^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                message: "이메일 형식이 아닙니다."
                            },
                        })}
                        onChange={clearLoginError}
                        name="email"
                        label="이메일"
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.email && (<FormError message={errors?.email?.message} />)}
                    <AuthInput
                        {...register('password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        onChange={clearLoginError}
                        name="password"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.password && (<FormError message={errors?.password?.message} />)}
                    <AuthButton type="submit">회원가입</AuthButton>
                    {errors?.result && (<FormError message={errors?.result?.message} />)}
                </form>
            </FormBox>
            <BottomBox cta="계정이 있으신가요?" linkText="로그인" link={`/login`} />
        </AuthLayout>
    )
}

export default SignUp;