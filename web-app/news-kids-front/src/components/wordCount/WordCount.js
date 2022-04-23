import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from 'd3-scale';
import { schemeTableau10 } from 'd3-scale-chromatic';

function WordCount({wordCount}) {
    const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeTableau10);
    
    return (
        <WordCloud
            data={wordCount.map((word) => ({text: word.word, value: word.count__sum}))}
            width={600}
            height={400}
            font="Helvetica"
            fontWeight="bold"
            fontSize={(word) => Math.log2(word.value) * 5}
            spiral="archimedean"
            rotate={(word) => word.value % 360}
            padding={5}
            random={Math.random}
            fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
            onWordClick={(event, d) => {
                console.log(`onWordClick: ${d.text}`);
            }}
        />
    );
}; 

export default WordCount;