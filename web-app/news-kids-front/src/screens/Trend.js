import { useState, useEffect } from 'react';
import WordCountApis from '../api/WordCountApis';
import ContainerLayout from '../components/shared/ContainerLayout';
import { Button, Toolbar } from '@material-ui/core'
import { useForm } from 'react-hook-form';
import WordCount from '../components/wordCount/WordCount';


function Trend() {

    const [wordCount, setWordCount] = useState([]);
    const [week, setWeek] = useState('');

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
    useEffect(() => {
        readWordCountLists(week);
    }, [week]);

    console.log(wordCount)
    return (
        <ContainerLayout>
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
            <WordCount wordCount={wordCount}/>
        </ContainerLayout>
    )
}

export default Trend;