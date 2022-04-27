import AxiosInstance from './AxiosInstance';
import openDictKey from 'src';

const DictApis = {
    getWord(word) {
        return AxiosInstance({
            url: `/api/search?key=${openDictKey}&q=${word}&req_type=json`,
            method: 'get'
        })
    }
}

export default DictApis;