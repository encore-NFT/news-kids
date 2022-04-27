import { Button, styled } from "@material-ui/core";
import { theme } from "../../styles";

const SubmitButton = styled(Button)({
    border: 'none',
    borderRadius: '3px',
    marginTop: '30px',
    backgroundColor: theme.palette.primary.light,
    textAlign: 'center',
    padding: '6px 0px',
    fontWeight: '600',
    width: '15%'
})

export default SubmitButton;