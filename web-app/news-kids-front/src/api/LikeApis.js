import AxiosInstance from './AxiosInstance';

const LikeApis = {
    postLike(newsData) {
        const { TOKEN, newsId } = newsData;
        const news_id = newsId
        
        return AxiosInstance({
            url: 'http://localhost:8000/api/news/like',
            method: 'post',
            headers: {
                'Authorization': TOKEN,
            },
            data: { news_id },
        });
    },
}

export default LikeApis;