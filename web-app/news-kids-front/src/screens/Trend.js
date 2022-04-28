import { useState, useEffect } from 'react';
import WordCountApis from '../api/WordCountApis';
import ContainerLayout from '../components/shared/ContainerLayout';
import { Button, Grid, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form';
import WordCount from '../components/wordCount/WordCount';
import ContentLayout from '../components/shared/ContentLayout';
import LineChart from '../components/wordCount/LineChart';
import UnderLine from '../components/shared/UnderLine';
import DictSearch from '../components/shared/DictSearch';

function Trend() {
    const [wordCount, setWordCount] = useState([]);
    const [wordHistory, setWordHistory] = useState([]);

    const [week, setWeek] = useState('');
    const [word, setWord] = useState('');

    const { register, handleSubmit } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        setWeek(data.week);
    };

    const readWordCountLists = async (week) => {
        try {
            const response = await WordCountApis.getWordCountList(week);
            if (response.status === 200) {
                setWordCount(response.data.data);
            } else {
                alert(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const readWordSearch = async (word) => {
        try {
            const response = await WordCountApis.postWordSearch(word);
            if (response.status === 200) {
                setWordHistory(response.data.data);
            } else {
                alert(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readWordCountLists(week);
    }, [week]);

    useEffect(() => {
        readWordSearch(word);
    }, [word]);

    return (
        <ContainerLayout>
            <DictSearch />
            <ContentLayout>
                <Typography
                    variant="h5"
                    component="h5"
                    style={{ marginBottom: '0.2em', fontWeight: 'bold' }}
                >
                    이번 주 이슈 단어를 살펴보세요
                </Typography>
                <Typography
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '1.5em'
                    }}
                >
                    한 주동안 많은 기사에서 언급 된 단어일 수록 단어의 크기가 큽니다
                </Typography>

                <UnderLine style={{ marginBottom: '1em' }} />

                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item>
                            <input
                                {...register('week')}
                                name="week"
                                type="week"
                                min='2021-W52'
                                max={Date()}
                                style={{ height: '2.1em' }}
                            />
                        </Grid>
                        <Grid item>
                            <Button type="submit" size='small' variant='outlined'>워드 클라우드</Button>
                        </Grid>
                    </Grid>
                </form>

                {wordCount && Object.keys(wordCount).length !== 0 ?
                    <WordCount wordCount={wordCount} setWord={setWord} />
                    : null}

                {
                    wordHistory && Object.keys(wordHistory).length !== 0 ?
                        <>
                            <Typography
                                variant="h5"
                                component="h5"
                                style={{ margin: '1em' }}
                            >
                                {word}
                            </Typography>

                            {wordHistory.categories.length !== 0 ?
                                <LineChart word={word} wordHistory={wordHistory} />
                                : null}
                        </> :
                        null
                }
            </ContentLayout>
        </ContainerLayout>
    )
}

export default Trend;