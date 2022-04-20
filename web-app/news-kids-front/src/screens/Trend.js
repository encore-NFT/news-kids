import { useState, useEffect } from 'react';
import WordCountApis from '../api/WordCountApis';
import ContainerLayout from '../components/shared/ContainerLayout';
import { Button, Toolbar } from '@material-ui/core'
// import WordCount from '../components/wordCount/WordCount';


function Trend() {
    
    const [wordCount, setWordCount] = useState([]);
    const [week, setWeek] = useState('');
    
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
    
    const weekChange = (e) => {
        e.preventDefault();
        setWeek(e.target.value);
    }

    console.log(week);
    return (
        <ContainerLayout>
            <Toolbar>
                <input 
                    type="week"
                    min='2021-W52'
                    onChange={(e) => weekChange(e)}
                />
                <Button size='small' >워드 클라우드</Button>
            </Toolbar>
            {/* <WordCount wordCount={wordCount}/> */}
        </ContainerLayout>
    )
}

export default Trend;