import AxiosInstance from './AxiosInstance';

const NewsApis = {
    getNewsList() {
        return AxiosInstance({
            url: 'http://localhost:8000/api/news',
            method: 'get',
        });
    },
    postSearchNews(data) {
        const { word } = data;

        return AxiosInstance({
            url: 'http://localhost:8000/api/news/search',
            method: 'post',
            data: { word },
        });
    },
}

export default NewsApis;