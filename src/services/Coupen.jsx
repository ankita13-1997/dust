import Axios from 'axios'
import Constant from '../config/config.js'

export default class Coupen{
    getCoupon = (totalPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'get',
            params: {totalPrice: totalPrice},
            url: `${Constant.baseUrl}coupon/fetchOrderCoupon/`,
        })
    }


    addDiscountPrice = (discountCoupon, totalPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'post',
            params: {discountCoupon: discountCoupon, totalPrice: totalPrice},
            url: `${Constant.baseUrl}coupon/addCoupon/`,
        })
    }
}