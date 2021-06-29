import AxiosService from "./AxiosService";
import Axios from 'axios'
import Constant from '../config/config.js'


const service = new AxiosService();

export default class OrderService{

    placedOrder = (totalPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'post',
            params: {totalPrice: totalPrice},
            url: `${Constant.baseUrl}order/addorder/`,
        })
    }

    myOrder = () => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'get',
            url: `${Constant.baseUrl}order/getall_order_details`,
        })
    }

    placed1Order = (totalprice,discountPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'post',
            params: {totalprice: totalprice,discountPrice:discountPrice},
            url: `${Constant.apiUrl}order`,
        })
    }

    getCoupon = (totalPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'get',
            params: {totalPrice: totalPrice},
            url: `${Constant.apiUrl}/coupon/fetchOrderCoupons`,
        })
    }

    addDiscountPrice = (discountCoupon, totalPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'post',
            params: {discountCoupon: discountCoupon, totalPrice: totalPrice},
            url: `${Constant.apiUrl}/coupon/addCoupon`,
        })
    }
}