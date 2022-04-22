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

    deleteComment(deleteData) {
        const { commentId, TOKEN } = deleteData;
        const { comment_id } = commentId;

        return AxiosInstance({
            url: 'http://localhost:8000/api/news/comments/' + comment_id,
            method: 'delete',
            headers: {
                'Authorization': TOKEN,
            },
            data: { comment_id },
        });
    },
}

export default NewsApis;