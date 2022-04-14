import { Button, styled } from "@material-ui/core";
import { theme } from "../../styles";

const AuthButton = styled(Button)({
    border: 'none',
    borderRadius: '3px',
    marginTop: '15px',
    backgroundColor: theme.palette.primary.light,
    textAlign: 'center',
    padding: '6px 0px',
    fontWeight: '600',
    width: '100%'
})

export default AuthButton;