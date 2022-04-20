import { Container, styled } from "@material-ui/core";

const EditContainer = styled(Container)({
    marginTop: '1.5rem',
    padding: '0px 100px 0px 100px;'
});

function EditFormBox({ children }) {
    return (
        <EditContainer>
            {children}
        </EditContainer>
    )
}

export default EditFormBox;