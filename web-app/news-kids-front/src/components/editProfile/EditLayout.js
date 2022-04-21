import { Container, styled } from "@material-ui/core";

const EditContainer = styled(Container)({
    border: '0.5px solid #eaeaea',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    padding: '3.5em 0em 5em 0em',
    boxShadow: '0px 0px 10px 1px #e2e2e2',
    textAlign: 'center',
    margin: '0 auto',
    marginBottom: '2rem'
});

const Wrapper = styled(Container)({
    width: '100%',
    maxWidth: '600px',
    minWidth: '350px',
    margin: '0 auto',
});

function EditLayout({ children }) {
    return (
        <EditContainer>
            <Wrapper>
                {children}
            </Wrapper>
        </EditContainer>
    )
}

export default EditLayout;