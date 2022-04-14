import { Container, styled } from "@material-ui/core";

const AuthContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid #dbdbdb',
    backgroundColor: '#ffffff',
    padding: '35px 40px 25px 40px;'
});

function FormBox({ children }) {
    return (
        <AuthContainer>
            {children}
        </AuthContainer>
    )
}

export default FormBox;