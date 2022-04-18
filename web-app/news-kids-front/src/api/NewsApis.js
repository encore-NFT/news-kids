import AxiosInstance from './AxiosInstance';

const NewsApis = {
    getNewsList() {
        return AxiosInstance({
            url:'http://localhost:8000/api/news',
            method: 'get',
        });
    },
}

export default NewsApis;