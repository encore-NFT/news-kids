import AxiosInstance from './AxiosInstance';

const NewsApis = {
    getNewsList(TOKEN) {
        const param = {
            url: 'http://localhost:8000/api/news',
            method: 'get'
        }
        if (TOKEN) {
            param['headers'] = { 'Authorization': TOKEN }
        }
        return AxiosInstance(param)
    },

    postSearchNews(data) {
        const { word } = data;

        return AxiosInstance({
            url: 'http://localhost:8000/api/news/search',
            method: 'post',
            data: { word },
        });
    },

    postComment(writeData) {
        const { data, TOKEN, news_id } = writeData;
        const { content } = data;
        const news = news_id;

        return AxiosInstance({
            url: 'http://localhost:8000/api/news/comments',
            method: 'post',
            headers: {
                'Authorization': TOKEN,
            },
            data: { news, content },
        });
    },

    deleteComment(deleteData) {
        const { comments_id, TOKEN } = deleteData;

        const param = {
            url: 'http://localhost:8000/api/news/comments/' + comments_id,
            method: 'delete',
        }
        if (TOKEN) {
            param['headers'] = { 'Authorization': TOKEN }
        }
        return AxiosInstance(param);
    },
}

export default NewsApis;