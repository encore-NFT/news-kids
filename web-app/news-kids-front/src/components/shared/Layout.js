import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
    margin: 0 auto;
    margin-top: 100px;
    width: 100%;
    max-width: 1000px;
    min-width: 500px;
`;

function Layout({ children, setIsLoggedIn, isLoggedIn }) {
    return (
        <>
            <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            <Content>
                {children}
            </Content>
        </>
    )
}

export default Layout;