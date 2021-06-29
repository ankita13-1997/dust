import AxiosService from "./AxiosService";


const service = new AxiosService();
export default class AdminService {

    adminLogin(requestData){
        console.log("the data from login requset ",requestData);
        return service.Post('Admin/login', requestData);
    }

}