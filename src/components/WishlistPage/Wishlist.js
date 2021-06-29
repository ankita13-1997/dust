import React, {Component, Fragment} from "react";
import NavigationBar from "../utils/NavigationBar"
import "../WishlistPage/Wishlist.css"
import Footer from "../utils/FooterBar";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Accordion, Grid, Typography} from "@material-ui/core";
import Signup from "../Signup/signup"
import EmptyWishlist from "../../Assets/emptywish.png"
import WishlistService from "../../services/WishlistService";
import Wish from "./Wish"
import { withRouter } from "react-router";


const wishlistService = new WishlistService();
class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddedToCart: [],
            count: 0,
            isDialogBoxVisible:false,
        }
    }

    handleWishlist = () => {
        wishlistService.getMyWishlist().then(response => {
            console.log("response details ",response);
            this.setState({
                checkoutData: response.data,
                count: response.data.length
            });

        }).catch((error) => {
                    this.setState({
                        checkoutData: []
                    })
            });
    }

    componentDidMount(){
        this.handleWishlist()
    }

    render() {
        let AddedToWishlist = this.state.checkoutData
        return (
            <Fragment>
                <div className="WishListMainDiv" >
                <NavigationBar/>

                {/* <DialogBoxPage component={<Signup/>} isDialogBoxVisible={this.state.isDialogBoxVisible}/> */}
                <Grid container>
                    <ul className="myorderbreadcrumb">
                            <li><a href="/">Home</a></li>
                            <li>Wishlist</li>
                        </ul>
                    <Typography component="h5" variant="h5" id="wishlistTitle"
                    >My Wishlist ({this.state.count})</Typography>
                    <Accordion id="wishlistContainer">
                        {this.state.count === 0 ?
                            <div id="emptyCart" >
                                <img src={EmptyWishlist}
                                     alt="Empty CartPage"
                                     width="250px" height="250px" />
                                <h3>Your Wishlist is Empty</h3>
                                
                            </div> :
                            <div container style={{paddingLeft:"5%"}}>
                                {AddedToWishlist.map((book, index) =>{
                                    console.log(AddedToWishlist)
                                    
                                    return <Wish handleWishlist={this.handleWishlist}
                                                book={book.book}
                                                bookName={book.book.bookName}
                                                authorName={book.book.authorName}
                                                bookPrice={book.book.bookPrice}
                                                image={book.book.image}
                                                wishId={book.book.bookId}
                                                // index={index}
                                    // {this.props.index !== this.props.AddedToWishlist.length - 1 ?
                                    //     <Divider/>  : console.log()
                                    // }
                                    />  
                                    }
                                )}
                            </div>
                        }
                    </Accordion>
                </Grid>
                <br/>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}

export default withRouter(Wishlist);
