import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import EditButton from "../components/editProfile/EditButton";
import MenuHeader from "../components/editProfile/MenuHeader";
import AuthInput from "../components/auth/AuthInput";
import { useForm } from "react-hook-form";

function PwdChange() {
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
                        {...register('pre_password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        name="pre_password"
                        label="이전 비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('new_password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        name="new_password"
                        label="새 비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    <AuthInput
                        {...register('chk_password', {
                            required: "비밀번호는 필수입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 최소 8자 이상입니다."
                            },
                        })}
                        name="chk_password"
                        label="새 비밀번호 확인"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    <EditButton type="submit">저장</EditButton>
                </form>
            </EditFormBox>
        </EditLayout>
    )
}

export default PwdChange;