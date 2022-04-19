import { Button, styled } from "@material-ui/core";
import { theme } from "../../styles";

const EditButton = styled(Button)({
    border: 'none',
    borderRadius: '3px',
    marginLeft: '20px',
    backgroundColor: theme.palette.primary.light,
    textAlign: 'center',
    padding: '2px 0px',
    fontWeight: '600',
    fontSize: '14px',
    width: '85px'
})

export default EditButton