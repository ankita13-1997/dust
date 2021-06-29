import AxiosService from "./AxiosService";
import Axios from 'axios'
import Constant from '../config/config.js'


const service = new AxiosService();

export default class WishlistService{
    addtoWishlist = (data) => {
        console.log("my wishlist data",data);
        return Axios({
            method: 'post',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}wishlist/wishlist/${data}`,
            data: data,
        })
    }

    getMyWishlist = () => {
        return Axios({
            method: 'get',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}wishlist/wishlist`
        })
    }

    remove = (id) => {
        return Axios({
            method: 'delete',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}wishlist/wishlist/${id}`
        })
    }


    

}