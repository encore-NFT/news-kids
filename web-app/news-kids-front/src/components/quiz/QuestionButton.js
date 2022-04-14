import { Button, styled } from "@material-ui/core";
import { theme } from "../../styles";

const QuestionButton = styled(Button)({
    padding: '10px 0px',
    width: '80%',
    margin: '8px auto',
    border: '0.5px solid #adadad',
    borderRadius: '20px',
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.secondary.contrastText,
})

export default QuestionButton;