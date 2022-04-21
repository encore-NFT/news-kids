import { Controller, useForm } from "react-hook-form";
import AuthInput from "../components/auth/AuthInput";
import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import EditButton from "../components/editProfile/EditButton";
import MenuHeader from "../components/editProfile/MenuHeader";
import ProfileApis from "../api/ProfileApis";
import { useEffect, useMemo, useState } from "react";
import FormError from "../components/auth/FormError";

function EditProfile() {
    const TOKEN = localStorage.getItem("Authorization");
    const [data, setData] = useState("");

    const getEditProfile = async (TOKEN) => {
        try {
            const response = await ProfileApis.getEditProfileList(TOKEN);
            console.log("프로필 response", response);
            const profileData = response.data.data;
            return setData(profileData);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getEditProfile(TOKEN);
    }, [TOKEN]);

    const initValue = {
        user_name: data?.user_name || "",
        user_nickname: data?.user_nickname || "",
        user_introduce: data?.user_introduce || "",
        user_email: data?.user_email || "",
    };

    useEffect(() => {
        reset(initValue);
    }, [data]);


    const { register, handleSubmit, reset, control, formState: { errors }, setError } = useForm({
        mode: "onChange",
        defaultValues: useMemo(() => initValue, [initValue]),
    });

    const onSubmitValid = (data) => {
        const editData = { TOKEN, data };
        postEditProfile(editData);
    };

    const postEditProfile = async (editData) => {
        try {
            const response = await ProfileApis.postEditProfileList(editData);
            console.log("프로필 수정 response", response);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <EditLayout>
            <MenuHeader />
            <EditFormBox>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Controller
                        render={({ field }) => (
                            <AuthInput
                                {...field}
                                {...register('user_name', {
                                    required: "사용자 아이디는 필수입니다."
                                })}
                                name="user_name"
                                label="아이디"
                                type="text"
                                variant="outlined"
                                size="small"
                            />
                        )}
                        control={control}
                        name="user_name"
                    />
                    {errors?.user_name && (<FormError message={errors?.user_name?.message} />)}
                    <Controller
                        render={({ field }) => (
                            <AuthInput
                                {...field}
                                {...register('user_nickname')}
                                name="user_nickname"
                                label="닉네임"
                                type="text"
                                variant="outlined"
                                size="small"
                            />
                        )}
                        control={control}
                        name="user_nickname"
                    />
                    <Controller
                        render={({ field }) => (
                            <AuthInput
                                {...field}
                                {...register('user_introduce')}
                                name="user_introduce"
                                label="소개"
                                multiline
                                minRows={6}
                                variant="outlined"
                            />
                        )}
                        control={control}
                        name="user_introduce"
                    />
                    <Controller
                        render={({ field }) => (
                            <AuthInput
                                {...field}
                                {...register('user_email', {
                                    required: "이메일은 필수입니다.",
                                    pattern: {
                                        value: /^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                        message: "이메일 형식이 아닙니다."
                                    },
                                })}
                                name="user_email"
                                label="이메일"
                                type="text"
                                variant="outlined"
                                size="small"
                            />
                        )}
                        control={control}
                        name="user_email"
                    />
                    {errors?.user_email && (<FormError message={errors?.user_email?.message} />)}
                    <EditButton type="submit">제출</EditButton>
                    {/* <FormError message={errors?.result?.message} /> */}
                </form>
            </EditFormBox>
        </EditLayout>
    )
}

export default EditProfile;
