import ContainerLayout from "../components/shared/ContainerLayout";
import ContentLayout from "../components/shared/ContentLayout";
import styledComponents from 'styled-components';
import { useMemo, useState } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Drawer, InputBase, styled } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { theme } from "../styles";
import SubmitButton from "../components/dictation/SubmitButton";
import Message from "../components/shared/Message"
import FormError from "../components/auth/FormError";

function Dictation() {
    const questions = [
        { value: '엄마가 장을 보러 가셨어요' },
        { value: '싫증나지만 참고 견뎌야 해' },
        { value: '윤리와 도덕을 공부하자' },
        { value: '보람된 삶을 살아야 해' },
        { value: '울음을 터뜨렸어요' },
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 20);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const { speak } = useSpeechSynthesis();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [message, setMessage] = useState("");

    const onSubmitValid = (data) => {
        const isCorrect = data.content === questions[currentQuestion].value;
        if (message !== undefined) {
            if (isCorrect) {
                setMessage("정답입니다.");
                setOpen(true);
                setTimeout(handleDrawerClose, 2000);
            } else {
                setMessage("오답입니다.");
                setOpen(true);
                setTimeout(handleDrawerClose, 2000);
            }
        }
        handleAnswerOptionClick(isCorrect);
        reset();
    };

    const [open, setOpen] = useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {showScore ? (
                <ContainerLayout>
                    <ContentLayout>
                        <QuizState>점수 결과</QuizState>
                        <Question>
                            {questions.length * 20}점 만점에 당신의 점수는 {score}점 입니다.
                        </Question>
                    </ContentLayout>
                </ContainerLayout>
            ) : (
                <ContainerLayout>
                    <ContentLayout>
                        <QuizTop>
                            <QuizState>
                                퀴즈 {currentQuestion + 1} / 5
                            </QuizState>
                        </QuizTop>
                        <DicButton onClick={() => speak({
                            text: questions[currentQuestion].value,
                            rate: 0.8,
                            pitch: 0.7,
                        })}>
                            <VolumeUpIcon />
                        </DicButton>
                        <Questions>
                            <form onSubmit={handleSubmit(onSubmitValid)}>
                                <Inputcontainer>
                                    <AnswerInput
                                        {...register('content', {
                                            required: "받아쓰기 입력은 필수입니다."
                                        })}
                                        name="content"
                                        type="text"
                                        placeholder="입력하세요"
                                    />
                                    <Dot>.</Dot>
                                </Inputcontainer>
                                {errors?.content && (<FormError message={errors?.content?.message} />)}
                                <br />
                                <SubmitButton type="submit">확인</SubmitButton>
                            </form>
                            <Drawer
                                variant="persistent"
                                anchor="bottom"
                                open={open}
                            >
                                <Message>
                                    {message}
                                </Message>
                            </Drawer>
                        </Questions>
                    </ContentLayout>
                </ContainerLayout>
            )}
        </>
    );
}

export default Dictation;

const QuizTop = styledComponents.div`
    text-align: center;
    margin-bottom: 20px;
`
const QuizState = styledComponents.div`
    display: inline-block;
    min-width: 110px;
    height: 36px;
    padding: 10px 15px 0 15px;
    background-color: #8973f5;
    text-align: center;
    border-radius: 20px;
    font-weight: 700;
    color: #ffffff;
    font-size: 16px;
`
const Question = styledComponents(QuizTop)`
    font-weight: 800;
    font-size: 24px;
    width: 100%;
    margin: 25px auto;
`

const Questions = styledComponents.div`
    display: flex;
    flex-direction: column;
`

const DicButton = styledComponents.button`
    background-color: #01A7DB;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    padding: 12px;
    margin-top: 15px;
`

const Inputcontainer = styledComponents.div`
    margin-top: 2rem;
    width: 100%;
`

const AnswerInput = styled(InputBase)({
    borderBottom: `1px solid ${theme.palette.secondary.contrastText}`,
    width: '60%',
});

const Dot = styledComponents.span`
    font-weight: 800;
    font-size: 38px;
`