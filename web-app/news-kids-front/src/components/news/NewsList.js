import {} from '@material-ui/core'
import NewsApis from '../../api/NewsApis';

const [news, setNews] = useState([]);

useEffect(() => {
    readNewsLIsts();
}, []);

const readNewsLIsts = async () => {
    try {
        const response = await NewsApis.getNewsList();
        if (response.status === 200) {
            console.log(response.data);
            setNews(response.data);
            console.log(news);
        } else {
            alert(response.status);
        }
    } catch (error) {
        console.log(error);
    }
};

const NewsList = null; 

export default NewsList;