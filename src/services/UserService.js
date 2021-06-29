import AxiosService from "./AxiosService";


const service = new AxiosService();
export default class UserService {

    userRegistration(requestData) {
        console.log("the data request of user ",requestData);
        return service.Post('user/register', requestData);
    }

    userLogin(requestData){
        console.log("the data from login requset ",requestData);
        return service.Post('user/login', requestData);
    }

    verifyuser(requestData){
        console.log("the token ",requestData);
        return service.Get('user/verify/email/'+requestData);

    }

    passwordService(requestData){
        console.log("the token ",requestData);
        return service.Post('user/resend/mail?emailID='+requestData);
    }

    resetNewPassword(requestData,token){
        console.log("the token ",requestData);
        console.log("the token ",token);
        return service.Post('user/reset/password/?password='+requestData+'&token='+token);
    }

    
}