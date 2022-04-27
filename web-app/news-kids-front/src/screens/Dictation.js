import ContainerLayout from "../components/shared/ContainerLayout";
import ContentLayout from "../components/shared/ContentLayout";
import styledComponents from 'styled-components';
// import { Button } from "@material-ui/core";
import { useState } from "react";
import Speech from 'react-speech';

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
                        <Speech 
                            text={questions[currentQuestion].value}
                            pitch="0.7"
                            rate="0.7"
                            volume="1"
                            lang='kr-KO'
                        />
                        {/* <Question>{questions[currentQuestion].questionText}</Question>
                        <Questions>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <QuestionButton key={answerOption.answerText} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</QuestionButton>
                            ))}
                        </Questions> */}
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