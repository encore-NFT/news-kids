// import ContainerLayout from '../shared/ContainerLayout'
// import { Grid, Typography, styled, Toolbar, Button } from '@material-ui/core'
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

function WordCount({wordCount}) {
    const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);
    
    return (
        <WordCloud
            data={wordCount.map((word) => ({text: word.word, value: word.count__sum}))}
            // {(data.map(function(d) {
            //     return {
            //         text: (d.kidCountWord ? d.kidCountWord : d.adultCountWord),
            //         value: (d.kidCountValue ? d.kidCountValue : d.adultCountValue)
            //     }
            // }))}
            width={600}
            height={400}
            font="Helvetica"
            fontWeight="bold"
            fontSize={(word) => word.value}
            spiral="rectangular"
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

// const NewsInfo = styled(Typography)({
//     textAlign: 'left',
//     padding: '0px 0px 0px 20px',
// })