import { Container, styled } from "@material-ui/core";
import styledComponents from "styled-components";

const AuthContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20vh'
});

const Wrapper = styledComponents.div`
    max-width: 400px;
    width: 100%;
`;

function AuthLayout({ children }) {
    return (
        <AuthContainer>
            <Wrapper>
                {children}
            </Wrapper>
        </AuthContainer>
    )
}

export default AuthLayout;