import AxiosInstance from './AxiosInstance';

const WordCountApis = {
    getWordCountList(week) {
        const param = week;
        
        return AxiosInstance({
            url:'http://localhost:8000/api/wordcount/' + param,
            method: 'get',
        });
    },
}

export default WordCountApis;