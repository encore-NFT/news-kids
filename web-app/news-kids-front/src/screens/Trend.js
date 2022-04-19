import { useState, useEffect } from 'react';
import WordCountApis from '../api/WordCountApis';
import WordCount from '../components/wordCount/WordCount';


function Trend() {
    
    const [wordCount, setWordCount] = useState([]);
    
    const readWordCountLists = async () => {
        try {
            const response = await WordCountApis.getWordCountList();
            if (response.status === 200) {
                console.log(response.data);
                setWordCount(response.data.data);
                console.log(wordCount);
            } else {
                alert(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readWordCountLists();
    }, []);
    

    return (
        <>
            <WordCount wordCount={wordCount}/>
        </>
    )
}

export default Trend;