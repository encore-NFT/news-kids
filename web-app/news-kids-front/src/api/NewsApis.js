import AxiosInstance from './AxiosInstance';

const NewsApis = {
    getNewsList(TOKEN) {
        return AxiosInstance({
            url: 'http://localhost:8000/api/news',
            method: 'get',
            headers: {
                'Authorization': TOKEN,
            },
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