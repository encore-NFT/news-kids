import { Container, styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import styledComponents from "styled-components";

const AuthContainer = styled(Container)({
    flexDirection: 'column',
    border: '1px solid #dbdbdb',
    backgroundColor: '#ffffff',
    padding: '20px 0px',
    marginTop: '10px',
    textAlign: 'center',
});

const LinkText = styledComponents(Link)`
    font-weight: 600;
    margin-left: 5px;
    color: #4d88d8;
`

function BottomBox({ cta, link, linkText }) {
    return (
        <AuthContainer>
            <span>{cta}</span>
            <LinkText to={link}>{linkText}</LinkText>
        </AuthContainer>
    )
}

export default BottomBox;