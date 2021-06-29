import Axios from 'axios'
import Constant from '../config/config.js'



export default class CartService {

    
    addtoCart = (data) => {
        console.log("my cart data",data);
        return Axios({
            method: 'post',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}cart/addtocart`,
            data: data,
        })
    }

    getMyCart = () => {
        return Axios({
            method: 'get',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}cart/allbooksincart`
        })
    }


    updateCart = (cartValues) => {
        return Axios({
            method:'put',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}cart/updatecartofbook`,
            data: cartValues

    
        })
    }

    remove = (id) => {
        return Axios({
            method: 'delete',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}cart/deletecart/${id}`
        })
    }

}

   




