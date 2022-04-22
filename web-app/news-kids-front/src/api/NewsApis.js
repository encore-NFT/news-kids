import AxiosInstance from './AxiosInstance';

const NewsApis = {
    getNewsList(TOKEN) {
        return AxiosInstance({
            url:'http://localhost:8000/api/news',
            method: 'get',
            headers: {
                'Authorization': TOKEN,
            },
        });
    },
}

export default NewsApis;