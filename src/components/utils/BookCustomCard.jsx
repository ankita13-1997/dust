import { Link, withRouter } from "react-router-dom";
import React, {Component} from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import '../utils/BookCustomCard.css'
import CartService from "../../services/CartService";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import im from "../../Assets/image36.png"
import image1 from "../../Assets/Image 7.png"
import Image2 from "../../Assets/Image 11.png"
import Image3 from "../../Assets/longing.jpg"
import Image4 from "../../Assets/Image 10.png"
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import WishlistService from "../../services/WishlistService";


const wishlistService = new WishlistService();
const cartServices = new CartService();
class BookCustomCard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            quantity: "",
            bookId: "",
            totalPrice:"",
            title: "Add To Bag",
            title1:"whishlist",
            color: "rgb(165,42,42)",
            color1: "black",
            counter: 0,
            badgeSize: '',
            addedInCart:false

        }
    }

    myCartData = () => {
        const cartDTO = {
            "bookId":this.props.book.bookId,
            "quantity": 1,
            "totalPrice":this.props.book.bookPrice
        }
        return cartDTO
    }

    changeText = () => {
        if (this.state.title === "ADDED TO CART") {
            this.props.history.push("/cart");
        }
        if (this.state.title !== "ADDED TO CART") {
            console.log("my cart",this.myCartData());
            cartServices.addtoCart(this.myCartData()).then(response =>{
                console.log("the my cart data in aad to cart service ",this.myCartData());
                console.log("rsponse of my cart data is ",response);

                this.setState({
                    title: "ADDED TO CART", color: "rgb(26, 89, 47)"
                })

                 this.props.cartReference.current.handleBadgeCount(this.state.badgeSize, "addButton")
            }).catch((error) => {

                 console.log("error in add to cart ",error);
                  //this.props.history.push("/signup");

                  //alert(error);
                
            })
        }
}

handleWishList = ()=>{
        if(this.state.title1 !== "ADDED TO wishlist")
        wishlistService.addtoWishlist(this.props.book.bookId).then(response => {
            console.log("wishList add");
            console.log("response of wishlist",response);
            this.setState({
                title1: "In wishlist", color1: "grey", 
            })
            
        }).catch((error) => {
            console.log("error in add to wishlist ",error);
            //  alert(error);
    
    })
    }


componentDidMount() {
    let user = localStorage.getItem('Authorization')
    if(user !== null) {
        this.handleButtonState()
    }
}

handleButtonState = () => {
    cartServices.getMyCart().then(response => {
        this.handleButton(response.data.data);
    }).catch((error) => {
        console.log(error)
    })
}

    
handleButton = (data) => {
        this.setState({
            badgeSize: data.length
        })
        data.map(data => {
            if (data.bookDetailsModel.bookId === this.props.book.bookId || data.bookDetailsModel.isAdded===true) {

                this.setState({
                    title: "ADDED TO CART", color: "rgb(13, 115, 13)"
                })
            }
            return null

            
        })
        
      
       
        this.props.cartReference.current.handleBadgeCount(data.length, "updateButton")
        console.log(data.bookDetailsModel.isAdded)
    }

    render(){
        let index = this.props.index;
        let book = this.props.book;
        return(
            <Card className="gridroot">
            <span className="tooltiptext"
            style={(index + 1) % 4 === 0 ? {marginLeft: "-315px"} : {marginLeft: "106px"}}>
            <b>Book Description:</b>
            <p className="tooltip-p">{book.description}</p></span>
           
            <CardActionArea>
            <CardMedia
            component="img"
            className="image1"

            height="100"
            src ={
                book.image==="../../Assets/image36.png"?im
                :book.image==="../../Assets/Image 7.png"?image1
                :book.image==="../../Assets/Image 11.png"?Image2
                :book.image==="../../Assets/longing.jpg"?Image3
                :Image4
            }/>

            <div 
            id="stock-label" 
            style={book.quantity === 0 ? {
            visibility: "visible",
            color: "#FF0000"} : {visibility: "hidden"}}>Out Of Stock
            </div>
            </CardActionArea>
            <CardContent>
            <Typography 
            component="h2" id="bookname">
            <b> {book.bookName}</b>
            </Typography> 
            <Typography
             variant="body2" 
             color="textSecondary" 
             component="p" 
             id="authorname">
             by {book.authorName}
            </Typography>
            <Typography component="h2" id="bookprice">
                        <b> Rs.{book.bookPrice}</b>
                    </Typography>
             <Typography component="h2" id="bookprice">
                      
                 </Typography> 
                 <span className="product-rating-count product-review-font">{book.rating}<StarIcon
                                                        id="iconSize" style={{height:"15px"}}/>
                                    </span>
                                    <b style={{color:'grey'}}> ({book.quantity})</b>
            </CardContent>
            <CardActions>
                { book.isAdded === true ? 
                        <Button onClick={this.changeText} value={this.state.title} style={{backgroundColor: "#d3d3d3", pointerEvents: "none", marginBottom: "2%", width: "80%", fontSize:"10px" }}>
                            <AssignmentTurnedInIcon style={{fontSize:"200%",paddingRight:"5%"}}/>ADDED TO CART
                        </Button>:
                        <Button onClick={this.changeText} value={this.state.title} style={book.quantity === 0
                            ? {backgroundColor: "#d3d3d3", pointerEvents: "none", marginBottom: "2%", width: "50%", fontSize:"10px" }
                            : {backgroundColor: this.state.color, width: "80%", marginBottom: "2%", color: "#fff",fontSize:"10px"}}>
                                <ShoppingBasketIcon  style={{fontSize:"200%",paddingRight:"5%"}}/>
                            {this.state.title}
                        </Button>
                }
           
                { book.isAddedToWish === true ?
                        <Button onClick={this.handleWishList} value={this.state.title1} style={{backgroundColor:"#d3d3d3", pointerEvents: "none", marginBottom: "2%", width: "80%",fontSize:"10px"}}>
                                <LoyaltyIcon style={{fontSize:"210%", left:"10%",paddingRight:"5%"}}/> In wishlist
                        </Button>:
                        <Button onClick={this.handleWishList} value={this.state.title1} style={book.bookId === true
                        ? {backgroundColor: "#d3d3d3", pointerEvents: "none", marginBottom: "2%", width: "40%",fontSize:"10px"}
                        : {backgroundColor: this.state.color1, width: "70%", marginBottom: "2%", color: "#fff",fontSize:"10px"}}>
                            <FavoriteIcon style={{fontSize:"200%",paddingRight:"5%"}}/> 
                        {this.state.title1}
                        </Button>
                }
            </CardActions>
            </Card>


        );
    }

}

export default withRouter(BookCustomCard);