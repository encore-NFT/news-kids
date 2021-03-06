import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import EditButton from "../components/editProfile/EditButton";
import MenuHeader from "../components/editProfile/MenuHeader";
import AuthInput from "../components/auth/AuthInput";
import { useForm } from "react-hook-form";
import ProfileApis from "../api/ProfileApis";
import FormError from "../components/auth/FormError";
import { useState } from "react";
import { Drawer, styled, Typography } from "@material-ui/core";
import Message from "../components/shared/Message";
import { useNavigate } from "react-router-dom";

function PwdChange({ setIsLoggedIn }) {
    const TOKEN = localStorage.getItem("Authorization");

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        const passwordData = { TOKEN, data };
        putNewPassword(passwordData);
    };
    const [successMessage, setSuccessMessage] = useState("");

    const putNewPassword = async (passwordData) => {
        try {
            const response = await ProfileApis.putPassword(passwordData);
            const message = response.data.data;
            localStorage.removeItem("Authorization");
            setIsLoggedIn(false);
            if (successMessage !== undefined) {
                setOpen(true);
                setTimeout(handleDrawerClose, 2000);
            };
            return setSuccessMessage(message);

        } catch (error) {
            if (error.response.status === 401) {
                return setError("result", {
                    message: error.response.data.message,
                });
            }
        }
    }
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
        navigate(`/login`);
    };

    const clearLoginError = () => {
        clearErrors("result");
        clearErrors("success");
    }
    return (
        <EditLayout>
            <MenuHeader />
            <EditFormBox>
                <Content variant="h5" component="h2">???????????? ??????</Content>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput
                        {...register('pre_password', {
                            required: "??????????????? ???????????????.",
                            minLength: {
                                value: 8,
                                message: "??????????????? ?????? 8??? ???????????????."
                            },
                        })}
                        onChange={clearLoginError}
                        name="pre_password"
                        label="?????? ????????????"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.pre_password && (<FormError message={errors?.pre_password?.message} />)}
                    <AuthInput
                        {...register('new_password', {
                            required: "??????????????? ???????????????.",
                            minLength: {
                                value: 8,
                                message: "??????????????? ?????? 8??? ???????????????."
                            },
                        })}
                        onChange={clearLoginError}
                        name="new_password"
                        label="??? ????????????"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.new_password && (<FormError message={errors?.new_password?.message} />)}
                    <AuthInput
                        {...register('chk_password', {
                            required: "??????????????? ???????????????.",
                            minLength: {
                                value: 8,
                                message: "??????????????? ?????? 8??? ???????????????."
                            },
                        })}
                        onChange={clearLoginError}
                        name="chk_password"
                        label="??? ???????????? ??????"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    {errors?.chk_password && (<FormError message={errors?.chk_password?.message} />)}
                    <EditButton type="submit">??????</EditButton>
                    {errors?.result && (<FormError message={errors?.result?.message} />)}
                    {/* {errors?.success && (<FormSuccess message={errors?.success?.message} />)} */}
                </form>
                <Drawer
                    variant="persistent"
                    anchor="bottom"
                    open={open}
                >
                    <Message>
                        {successMessage}
                    </Message>
                </Drawer>
            </EditFormBox>
        </EditLayout>
    )
}

export default PwdChange;

const Content = styled(Typography)({
    textAlign: 'left',
    marginBottom: '35px',
})