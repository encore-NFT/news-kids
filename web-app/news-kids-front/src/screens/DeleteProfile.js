import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import EditButton from "../components/editProfile/EditButton";
import MenuHeader from "../components/editProfile/MenuHeader";
import AuthInput from "../components/auth/AuthInput";
import { useForm } from "react-hook-form";
import { styled, Typography } from "@material-ui/core";
import FormError from "../components/auth/FormError";
import ProfileApis from "../api/ProfileApis";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DeleteProfile({ setIsLoggedIn }) {
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

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        mode: "onChange",
    });
    const onSubmitValid = (data) => {
        const deleteData = { TOKEN, data };
        deleteProfile(deleteData);
    };

    const deleteProfile = async (deleteData) => {
        try {
            const response = await ProfileApis.deleteUser(deleteData);
            console.log("계정삭제 response", response.data);
            localStorage.removeItem("Authorization");
            setIsLoggedIn(false);
            alert("계정이 삭제되었습니다.")
            navigate(`/`);
        } catch (err) {
            if (err.response.status === 401) {
                return setError("result", {
                    message: err.response.data.message,
                });
            }
        }
    }

    const clearLoginError = () => {
        clearErrors("result");
    }
    return (
        <EditLayout>
            <MenuHeader />
            <EditFormBox>
                <Content variant="h5" component="h2">계정 삭제</Content>
                <LongContent variant="body2">{data?.profile?.user_name}님, 안녕하세요.</LongContent>
                <Content variant="body2">계정을 삭제하려고 하신다니 아쉽습니다.</Content>
                <Content variant="h6" component="h4">계속하려면 비밀번호를 다시 입력하세요</Content>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput
                        {...register('user_password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        onChange={clearLoginError}
                        name="user_password"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.user_password && (<FormError message={errors?.user_password?.message} />)}
                    <LongContent>아래 버튼을 누르면 댓글, 좋아요를 포함한 모든 데이터가 영구적으로 삭제되어 복구할 수 없게 됩니다.</LongContent>
                    <EditButton type="submit">계정 영구 삭제</EditButton>
                    {errors?.result && (<FormError message={errors?.result?.message} />)}
                </form>
            </EditFormBox>
        </EditLayout>
    )
}

export default DeleteProfile;

const Content = styled(Typography)({
    textAlign: 'left',
    marginBottom: '0em',
})

const LongContent = styled(Typography)({
    textAlign: 'left',
    fontSize: '14px',
    // margin: '2.5em 0 0.5em 0',
    marginTop: '2.5em'

})