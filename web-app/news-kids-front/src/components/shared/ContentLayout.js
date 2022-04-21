import { Container, styled } from "@material-ui/core";

const ContentContainer = styled(Container)({
    width: '100%',
    maxWidth: '800px',
    minWidth: '350px',
    margin: '0 auto',
});

function ContentLayout({ children }) {
    return (
        <ContentContainer>
            {children}
        </ContentContainer>
    )
}

export default ContentLayout;