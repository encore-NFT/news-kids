import AxiosInstance from './AxiosInstance';

const WordCountApis = {
    getWordCountList() {
        return AxiosInstance({
            url:'http://localhost:8000/api/wordcount',
            method: 'get',
        });
    },
}

export default WordCountApis;