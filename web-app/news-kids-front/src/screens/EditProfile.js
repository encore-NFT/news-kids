import { useForm } from "react-hook-form";
import AuthInput from "../components/auth/AuthInput";
import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import EditButton from "../components/editProfile/EditButton";
import MenuHeader from "../components/editProfile/MenuHeader";

function EditProfile() {

    const { register, handleSubmit } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        console.log(data);
    };

    return (
        <EditLayout>
            <MenuHeader />
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
