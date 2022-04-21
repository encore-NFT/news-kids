import EditFormBox from "../components/editProfile/EditFormBox";
import EditLayout from "../components/editProfile/EditLayout";
import EditButton from "../components/editProfile/EditButton";
import MenuHeader from "../components/editProfile/MenuHeader";
import AuthInput from "../components/auth/AuthInput";
import { useForm } from "react-hook-form";
import { styled, Typography } from "@material-ui/core";

function DeleteProfile() {
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
                <Content variant="h5" component="h2">계정 삭제</Content>
                <LongContent variant="body2">000님, 안녕하세요.</LongContent>
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
                        name="user_password"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        size="small"
                    />
                    <LongContent>아래 버튼을 누르면 댓글, 좋아요를 포함한 모든 데이터가 영구적으로 삭제되어 복구할 수 없게 됩니다.</LongContent>
                    <EditButton type="submit">계정 영구 삭제</EditButton>
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