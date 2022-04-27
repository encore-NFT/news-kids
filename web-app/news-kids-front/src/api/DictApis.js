import AxiosInstance from './AxiosInstance';
import Api from '../config';

const DictApis = {
    getWord(data) {
        const { word } = data;
        const key = Api.openDictKey;
        return AxiosInstance({
            url: `/api/search?key=${key}&q=${word}&req_type=json`,
            method: 'get'
        })
    }
}

export default DictApis;