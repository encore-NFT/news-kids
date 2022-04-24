import { useState, useEffect } from 'react';
import WordCountApis from '../api/WordCountApis';
import ContainerLayout from '../components/shared/ContainerLayout';
import { Button, Toolbar } from '@material-ui/core'
import { useForm } from 'react-hook-form';
import WordCount from '../components/wordCount/WordCount';
import ContentLayout from '../components/shared/ContentLayout';
import CommentUnderLine from '../components/shared/CommentUnderLine';
import LineChart from '../components/wordCount/LineChart';


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
            <ContentLayout>

                <Toolbar>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <input
                            {...register('week')}
                            name="week"
                            type="week"
                            min='2021-W52'
                        />
                        <Button type="submit" size='small' >워드 클라우드</Button>
                    </form>
                </Toolbar>

                <CommentUnderLine/>

                <WordCount wordCount={wordCount} setWord={setWord}/>

                <CommentUnderLine/>
                
                {console.log(wordHistory)}

                {
                    word !== '' ? 
                    <LineChart word={word} wordHistory={wordHistory}/> :
                    null
                }
                

            </ContentLayout>
        </ContainerLayout>
    )
}

export default Trend;