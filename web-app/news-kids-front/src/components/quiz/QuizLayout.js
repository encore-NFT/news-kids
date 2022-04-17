import { Container, styled } from "@material-ui/core";

const QuizContainer = styled(Container)({
    border: '0.5px solid #eaeaea',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    padding: '5em 2em',
    boxShadow: '0px 0px 10px 1px #e2e2e2',
    textAlign: 'center',
});

function QuizLayout({ children }) {
    return (
        <QuizContainer>
            {children}
        </QuizContainer>
    )
}

export default QuizLayout;