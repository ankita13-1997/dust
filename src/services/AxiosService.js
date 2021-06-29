import axios from 'axios';
import { baseUrl } from '../config/config';

export default class AxiosService {
    
    api = axios.create({ url: baseUrl });

    Post(url, data) {
        return axios.post(baseUrl+url, data, {
            headers: {
                contentType: 'application/json'
            }
        })
    }

    PostFor(url, data,data2) {
        return axios.post(baseUrl+url, data, data2,{
            headers: {
                contentType: 'application/json'
            }
        })
    }

    Get(url) {
        return axios.get(baseUrl+url,  {
            headers: {
                contentType: 'application/json'
            }
        })
    }

    

    
}