import React, {Component} from 'react';
import Footer from "../utils/FooterBar";
import Navigation from "../utils/NavigationBar";
import '../MyOrder/MyOrder.css'
import Grid from "@material-ui/core/Grid";
import MyOrder from "./MyOrder";
import OrderService from "../../services/OrderService"
import Typography from "@material-ui/core/Typography";
const orderServices = new OrderService();

class MyOrdersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }
    }

    getPlacedOrder = () => {
        orderServices.myOrder().then(response => {
            console.log("response is ",response.data);
           
            let newDataArray =  [];
            newDataArray=response.data;
            let temp=[];
            for(let i=0 ; i<newDataArray.length; i++){
                for(let j = 0; j<newDataArray[i].length;j++){
                console.log("length is ",newDataArray[i][j]);
                //let arrayPush=newDataArray[i][0];
                //console.log
                temp.push(newDataArray[i][j])
                console.log("the temp array is ",temp);
                }
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


    render() {
        let order = this.state.orderList
        
        console.log("order object ",order);
        return (
            <div>
                <div className="main-order">
                    <Grid container className="ordercontainer">
                        <Navigation/>
                        <ul className="myorderbreadcrumb">
                            <li><a href="/homepage">Home</a></li>
                            <li>My Orders</li>
                        </ul>

                        <div>
                        {order.reverse().map((book, index) => {
                                return (
                                    <div>
                                            <div className="myorderdiv">
                                                <Typography component="h2" id="orderdate">Ordered
                                          Date: {book.orderDetails.orderPlacedDate}</Typography>
                                                <Typography id="orderid">Order
                                                    ID: {book.orderDetails.orderId}</Typography>
                                            </div>


                                        <div
                                            className={book.length === 1 ? "order-block" : book.length === 2 ? "orderblock" : "orderblock1"}>
                                            
                                              
                                                    <div className="order-list">
                                                        <MyOrder data ={book} />
                                                    </div>
                                               
                                           
                                        </div>

                                    </div>)
                            })} 
                        </div>
                    </Grid>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default MyOrdersList;