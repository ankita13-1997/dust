import React, { Component } from 'react'

import Typography from "@material-ui/core/Typography";
import OrderService from "../../services/OrderService";
import CartService from "../../services/CartService"
import CustomerService from "../../services/CustomerService"
import "../Cart/Cart.css"
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Divider from "@material-ui/core/Divider";
import Book from "../../Assets/tick.jpg"
import im from "../../Assets/image36.png"
import image1 from "../../Assets/Image 7.png"
import Image2 from "../../Assets/Image 11.png"
import Image3 from "../../Assets/longing.jpg"
import Image4 from "../../Assets/Image 10.png"
import Rating from '@material-ui/lab/Rating';


const cartServices = new CartService();
class CartItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.quantity,
            changedCount: '',
            disableDecrementButton:false,
            disableIncrementButton:true,
            totalPrice:this.props.books.bookPrice,
            countPrice:this.props.books.bookPrice,
            booksQuantity:this.props.books.quantity
            
        }
    }

    checkAndRemove = (count, id,type) => {
        if (count === 0) {
            this.remove(id)
        }
        this.disableDecrementButton(type)
        this.disableIncrementButton(type)
    }

    remove = (bookId) => {
        console.log("the book id",bookId)
        cartServices.remove(bookId).then(response => {
           
            this.props.handleCart()
        }).catch((error) => {
            console.log(error)
        })
    }

    onclick(type, id, bookId) {
        if (this.state.count >= 0) {
            this.setState({
                count: type === 'add' ? this.state.count + 1 : this.state.count - 1,
                // totalPrice:type === 'add'?this.state.totalPrice+this.state.countPrice:this.state.totalPrice+this.state.countPrice,
                changedCount: id
            }, () => this.checkAndRemove(this.state.count, bookId,type));
        }
        type === 'add' ? this.updateCount(bookId, this.state.count + 1) : this.updateCount(bookId, this.state.count - 1)

    }

    updateCount = (bookId, count) => {
        const cartDTO = {
            "bookId":this.props.cartID,
            "quantity": count,
            "totalPrice":this.props.books.bookPrice*count,
        }
        console.log("the cart dto ",cartDTO)

       cartServices.updateCart(cartDTO).then(response => {
           console.log("the cartDto after ",cartDTO);
           console.log("the count price "+this.state.countPrice);
           console.log("the response all ",response);
            this.props.handleCart()
        }).catch((error) => {
            console.log(error)
        })
    }

    disableDecrementButton = (type) => {

        if (type === 'sub' && this.state.disableDecrementButton) {
            this.setState({
                disableDecrementButton: false
            })
        }
        if (this.state.count === this.state.booksQuantity || this.props.flag) {
            this.setState({
                disableDecrementButton: true
            })
        }

    }

    disableIncrementButton=(type)=>{

        if ((type === 'add' && this.state.disableIncrementButton) || this.props.flag) {
            this.setState({
                disableIncrementButton: true
            })
        }
        if(this.state.count > 1){
            this.setState({
                disableIncrementButton:false
            })
        }

        if(this.state.count === 1 || this.props.flag){
            this.setState({
                disableIncrementButton:true
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.disableDecrementButton("loaded")
        this.disableIncrementButton("loaded")
    }


    render() {
        return (
            <div className="mycart">
                <div>
                    <img src={this.props.image==="../../Assets/image36.png"?im
                             :this.props.image==="../../Assets/Image 7.png"?image1
                             :this.props.image==="../../Assets/Image 11.png"?Image2
                             :this.props.image==="../../Assets/longing.jpg"?Image3
                             :Image4
                    } 
                    alt="Not found" className="mycart-img"/>
                </div>
                <div className="books-container">
                    <Typography component="h2" id="bookname1">{this.props.bookName}</Typography>
                    <Typography variant="body2" color="textSecondary" id="authorName">{this.props.authorName}</Typography>
                    <Typography component="h2" id="cost">Rs.{this.props.price}</Typography>
                    <div className="plusminusdiv">
                        <IconButton id="minus" disabled={this.state.disableIncrementButton}
                            onClick={() => this.onclick('sub',this.props.books.bookPrice, this.props.id,this.props.bookId)}>
                            <RemoveCircleOutlineIcon id={this.state.disableIncrementButton===true ? "plusminubtn1":"plusminubtn"}/>
                        </IconButton>

                        <input  id="text" value={this.state.count} aria-label="count"></input>

                        <IconButton id="plus" disabled={this.state.disableDecrementButton}
                                    onClick={() => this.onclick('add', this.props.books.bookPrice,this.props.id,this.props.bookId)}>
                            <AddCircleOutlineIcon id={this.state.disableDecrementButton===true ? "plusminubtn1":"plusminubtn"}/>
                        </IconButton>

                        <button className="remove" disabled={this.props.flag} onClick={() => this.remove(this.props.cartID)}>Remove
                        </button>
                    </div>
                </div><br/>
                {this.props.index !== this.props.cartData.length - 1 ?
                    <Divider/>  : console.log()
                }
            </div>

        );
    }
}

export default CartItems;