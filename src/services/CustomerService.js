import Axios from 'axios';
import Constant from '../config/config.js'

export default class CustomerService{

    addCustomerDetails = (data) => {
        console.log("my customer data ",data);
        return Axios({
            method: 'post',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}customer/addDetail_customer`,
            data: data,
        })
    }
  
    customerDetails = () => {
        return Axios({
            method: 'get',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}customer/getall_details`,
            
           
        })
    }

    getAllUserInformation = () => {
        return Axios({
            method: 'get',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.baseUrl}user/getDetailsOfUser`,
            
           
        })
    }

   
}