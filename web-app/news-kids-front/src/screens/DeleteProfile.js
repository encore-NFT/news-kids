import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import EditButton from "../components/editProfile/EditButton";
import MenuHeader from "../components/editProfile/MenuHeader";
import AuthInput from "../components/auth/AuthInput";
import { useForm } from "react-hook-form";
import { Drawer, styled, Typography } from "@material-ui/core";
import FormError from "../components/auth/FormError";
import ProfileApis from "../api/ProfileApis";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/shared/Message";

function DeleteProfile({ setIsLoggedIn }) {
    const TOKEN = localStorage.getItem("Authorization");

    const [data, setData] = useState("");

    const getProfile = async (TOKEN) => {
        try {
            const response = await ProfileApis.getProfileList(TOKEN);
            const profileData = response.data.data;
            return setData(profileData);

        } catch (error) {
            console.log(error);
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
            await ProfileApis.deleteUser(deleteData);
            localStorage.removeItem("Authorization");
            setIsLoggedIn(false);
            setOpen(true);
            setTimeout(handleDrawerClose, 2000);
        } catch (error) {
            if (error.response.status === 401) {
                return setError("result", {
                    message: error.response.data.message,
                });
            }
        }
    }

    const [open, setOpen] = useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
        navigate(`/`);
    };

    const clearLoginError = () => {
        clearErrors("result");
    }
    return (
        <EditLayout>
            <MenuHeader />
            <EditFormBox>
                <Content variant="h5" component="h2">?????? ??????</Content>
                <LongContent variant="body2">{data?.profile?.user_name}???, ???????????????.</LongContent>
                <Content variant="body2">????????? ??????????????? ???????????? ???????????????.</Content>
                <Content variant="h6" component="h4">??????????????? ??????????????? ?????? ???????????????</Content>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput
                        {...register('user_password', {
                            required: "??????????????? ???????????????.",
                            minLength: {
                                value: 8,
                                message: "??????????????? ?????? 8??? ???????????????."
                            },
                        })}
                        onChange={clearLoginError}
                        name="user_password"
                        label="????????????"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.user_password && (<FormError message={errors?.user_password?.message} />)}
                    <LongContent>?????? ????????? ????????? ??????, ???????????? ????????? ?????? ???????????? ??????????????? ???????????? ????????? ??? ?????? ?????????.</LongContent>
                    <EditButton type="submit">?????? ?????? ??????</EditButton>
                    {errors?.result && (<FormError message={errors?.result?.message} />)}
                </form>
                <Drawer
                    variant="persistent"
                    anchor="bottom"
                    open={open}
                >
                    <ErrorMessage>
                        ????????? ?????????????????????.
                    </ErrorMessage>
                </Drawer>
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
    marginTop: '2.5em'

})