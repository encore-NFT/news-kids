import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import EditButton from "../components/editProfile/EditButton";
import MenuHeader from "../components/editProfile/MenuHeader";
import AuthInput from "../components/auth/AuthInput";
import { useForm } from "react-hook-form";
import ProfileApis from "../api/ProfileApis";
import FormError from "../components/auth/FormError";
import FormSuccess from "../components/editProfile/FormSuccess";
import { useEffect, useState } from "react";
import { styled, Typography } from "@material-ui/core";

function PwdChange() {
    const TOKEN = localStorage.getItem("Authorization");

    const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        const passwordData = { TOKEN, data };
        putNewPassword(passwordData);
    };
    const [data, setData] = useState("");

    const putNewPassword = async (passwordData) => {
        try {
            const response = await ProfileApis.putPassword(passwordData);
            const successMessage = response.data.data;
            return setData(successMessage);

        } catch (error) {
            if (error.response.status === 401) {
                return setError("result", {
                    message: error.response.data.message,
                });
            }
        }
    }
    useEffect(() => {
        if (data) {
            reset();
            setError("success", {
                message: data,
            });
        }
    }, [data]);
    
    const clearLoginError = () => {
        clearErrors("result");
        clearErrors("success");
    }
    return (
        <EditLayout>
            <MenuHeader />
            <EditFormBox>
                <Content variant="h5" component="h2">비밀번호 변경</Content>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput
                        {...register('pre_password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        onChange={clearLoginError}
                        name="pre_password"
                        label="이전 비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.pre_password && (<FormError message={errors?.pre_password?.message} />)}
                    <AuthInput
                        {...register('new_password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        onChange={clearLoginError}
                        name="new_password"
                        label="새 비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.new_password && (<FormError message={errors?.new_password?.message} />)}
                    <AuthInput
                        {...register('chk_password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        onChange={clearLoginError}
                        name="chk_password"
                        label="새 비밀번호 확인"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.chk_password && (<FormError message={errors?.chk_password?.message} />)}
                    <EditButton type="submit">저장</EditButton>
                    {errors?.result && (<FormError message={errors?.result?.message} />)}
                    {errors?.success && (<FormSuccess message={errors?.success?.message} />)}
                </form>
            </EditFormBox>
        </EditLayout>
    )
}

export default PwdChange;

const Content = styled(Typography)({
    textAlign: 'left',
    marginBottom: '35px',
})