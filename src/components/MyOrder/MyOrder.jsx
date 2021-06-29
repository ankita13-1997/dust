import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import im from "../../Assets/image36.png"
import image1 from "../../Assets/Image 7.png"
import Image2 from "../../Assets/Image 11.png"
import Image3 from "../../Assets/longing.jpg"
import Image4 from "../../Assets/Image 10.png"

class MyOrder extends Component {

    render() {
        return (
            <div>
                <Grid className="order-grid" item xs={12} sm={12} md={12} lg={12} xl={12} spacing={2}>
                    <div id="orderimg">
                    <img src={this.props.data.bookDetailsModel.image==="../../Assets/image36.png"?im
                             :this.props.data.bookDetailsModel.image==="../../Assets/Image 7.png"?image1
                             :this.props.data.bookDetailsModel.image==="../../Assets/Image 11.png"?Image2
                             :this.props.data.bookDetailsModel.image==="../../Assets/longing.jpg"?Image3
                             :Image4
                    } 
                    alt="Not found" className="order-img"/>
                    </div>
                    <div className="order-div">
                        <Typography id="order-bookname"
                                    component="h2">{this.props.data.bookDetailsModel.bookName}</Typography>
                        <Typography variant="body2" color="textSecondary"
                                    id="order-authorname">{this.props.data.bookDetailsModel.authorName}</Typography>
                        <Typography component="h2"
                                    id="order-cost">Quantity. {this.props.data.quantity}</Typography>
                        <Typography component="h2"
                                    id="order-cost">RS. {this.props.data.totalPrice}</Typography>
                    </div>
                </Grid>
                <Divider style={{marginLeft: "1%", marginRight: "1%"}}/>
            </div>
        );
    }
}

export default MyOrder;
