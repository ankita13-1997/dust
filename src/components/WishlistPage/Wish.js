import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import "../WishlistPage/Wishlist.css"
import im from "../../Assets/image36.png"
import image1 from "../../Assets/Image 7.png"
import Image2 from "../../Assets/Image 11.png"
import Image3 from "../../Assets/longing.jpg"
import Image4 from "../../Assets/Image 10.png"
import WishlistService from "../../services/WishlistService";
import DeleteIcon from '@material-ui/icons/Delete';

const wishlistService = new WishlistService();
class Wish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    remove = (bookId) => {
        console.log("the book id",bookId)
        wishlistService.remove(bookId).then(response => {
            this.props. handleWishlist()
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div  className="mycart" >
                  <div  style={{paddingTop:"4%"}}>
                    <img src={this.props.image==="../../Assets/image36.png"?im
                             :this.props.image==="../../Assets/Image 7.png"?image1
                             :this.props.image==="../../Assets/Image 11.png"?Image2
                             :this.props.image==="../../Assets/longing.jpg"?Image3
                             :Image4
                    } 
                    alt="Not found" className="mycart-img"/>
                </div>
               
                <div className="wishlistContainer"  style={{paddingTop:"3%"}}>
                    <Typography component="h2" id="bookname1">{this.props.bookName}</Typography>
                    <Typography variant="body2" color="textSecondary" id="authorName">{this.props.authorName}</Typography>
                    <Typography component="h2" id="cost">Rs.{this.props.bookPrice}</Typography>
                    <div className="plusminusdiv" style={{paddingLeft:"10%"}}>
                <button className="remove"   style={{paddingLeft:"30%", cursor: "pointer"}}
                        disabled={this.props.flag} onClick={() => this.remove(this.props.wishId)}><DeleteIcon/> 
                        </button>
                       
                    </div>
                </div>
                
                <br/>
                {/* {this.props.index !== this.props.AddedToWishlist.length - 1 ?
                    <Divider/>  : console.log()
                } */}

            </div>
        )
    }
}

export default Wish;