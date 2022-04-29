import AxiosInstance from './AxiosInstance';

const WordCountApis = {
    getWordCountList(week) {
        const param = (week==='' ? week : 'week/' + week);

        return AxiosInstance({
            url: 'http://localhost:8000/api/wordcount/' + param,
            method: 'get',
        });
    },

    postWordSearch(word) {
        return AxiosInstance({
            url: 'http://localhost:8000/api/wordcount/search',
            method: "post",
            data: { word }
        })
    }
}

export default WordCountApis;