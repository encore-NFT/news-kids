import { Container, styled } from '@material-ui/core';
import { useState } from 'react';

function Quiz() {
    const questions = [
        {
            questionText: '다음 중 순우리말은?',
            answerOptions: [
                { answerText: '바람', isCorrect: true },
                { answerText: '커피', isCorrect: false },
                { answerText: '노트북', isCorrect: false },
                { answerText: '초콜릿', isCorrect: false },
            ],
        },
        {
            questionText: '_____가 각각 다르기 때문에 가치도 약간 다르다. 사람들은 다른 목적을 추구하고, 다른 충동을 갖고, 다른 형의 행복을 그리워한다.',
            answerOptions: [
                { answerText: '문화', isCorrect: false },
                { answerText: '역사', isCorrect: false },
                { answerText: '포부', isCorrect: true },
                { answerText: '풍토', isCorrect: false },
            ],
        },
        {
            questionText: '이 옷은 제가 직접 한 ____ 한 ____ 실로 꿰매어 제작하였어요.',
            answerOptions: [
                { answerText: '번', isCorrect: false },
                { answerText: '괘', isCorrect: false },
                { answerText: '수', isCorrect: false },
                { answerText: '땀', isCorrect: true },
            ],
        },
        {
            questionText: '다음 중 맞춤법이 틀린 문장은?',
            answerOptions: [
                { answerText: '그 정책은 참담한 결과를 낳았다.', isCorrect: false },
                { answerText: '어제 아내가 공주님을 낳았다.', isCorrect: true },
                { answerText: '상황이 낮아졌다.', isCorrect: false },
                { answerText: '여러분이 기자보다 낮다.', isCorrect: false },
            ],
        },
        {
            questionText: '다음에서 그 의미가 나머지 세 개와 현저히 다른 것은?',
            answerOptions: [
                { answerText: '푸념', isCorrect: false },
                { answerText: '넋두리', isCorrect: false },
                { answerText: '넉살', isCorrect: true },
                { answerText: '불평', isCorrect: false },
            ],
        },
    ];

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
                <div>
                    You scored {score} out of {questions.length * 20}
                </div>
            ) : (
                <QuizContainer>
                    <div>
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                    </div>
                    <div>{questions[currentQuestion].questionText}</div>
                    <div>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button key={answerOption.answerText} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                        ))}
                    </div>
                </QuizContainer>
            )}
        </>
    );
}

export default Quiz;

const QuizContainer = styled(Container)({
    border: '0.5px solid #eaeaea',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    height: '100%',
    padding: '1.5em 2em'
});