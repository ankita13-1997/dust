import React from "react";
import NavigationBar from '../utils/NavigationBar'
import Footer from '../utils/FooterBar';
import "../Order/OrderSuccess.css";
import Button from "@material-ui/core/Button";
import PlacedOrderSuccessfully from '../../Assets/OrderSuccess.png'
import OrderService from "../../services/OrderService"
import Typography from "@material-ui/core/Typography";
const orderServices = new OrderService();

export default class OrderSuccessfull extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }
    }

    // handleChange = () => {
    //     this.props.history.push("/")
    // }

    getPlacedOrder = () => {
        orderServices.myOrder().then(response => {
            console.log("response is ",response.data);
           
            let newDataArray =  [];
            newDataArray=response.data;
            let temp=[];
            for(let i=0 ; i<newDataArray.length; i++){
                console.log("length is ",newDataArray[i][0]);
                //let arrayPush=newDataArray[i][0];
                //console.log
                temp.push(newDataArray[i][0])
                console.log("the temp array is ",temp);
            }
            

            this.setState({
                orderList: temp,
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getPlacedOrder();
    }

    render(){
        const email = "Yennefer@bookstore.com";
        const mobileNumber = "+919866666610";
        const address = "Platform no 9 1/2,Way to Hogwarts"
        let order = this.state.orderList;
        return(
            <div>
            <NavigationBar/>
            <div className="WishListMainDiv">
            
            <img className={'successfulimage'}
                 src={PlacedOrderSuccessfully}
                 alt={"OrderSuccess"}/>
                 
            <div className="messageorder">
            hurray!!! your order is confirmed the order id  is
            {order.reverse().map((book, index) => {
                return(
                
                <div>
                    <b> #{book.orderDetails.orderId}</b>   
                 
                    - - save the order id for further communication...
                    </div>)
               
            })}
               
               
            </div>
            
            
            <table className="orderTable" style={{left:'60%'}}>
                <thead>
                <tr className="tableRow">
                    <th>Email Us</th>
                    <th>Contact Us</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                <tr className="tableRow">
                    <td data-for='emailId'>{email}
                    </td>
                    <td data-for='mobileNumber'>{mobileNumber}
                    </td>
                    <td data-for='address'> {address}
                    </td>
                </tr>
                </tbody>
            </table>

            <Button href={"/homepage"} className="orderButton" style={{left:'43%'}}>Continue  Shopping</Button>
        </div>
        <Footer/>
        </div>
        );
    }
}