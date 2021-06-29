import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextFields from "../utils/CustomTextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import '../Cart/Cart.css'
import Coupon from '../CoupenFolder/coupenHold.jsx'
import {withRouter} from 'react-router';
import Card from "@material-ui/core/Card";
//import {AdminService} from "../../service/AdminService";
import CartItems from "./CartItems";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
//import SignUp from "./SignUp";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
//import Coupon from "./Coupon";
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import FooterBar from '../utils/FooterBar';
import CartIsEmpty from "../../Assets/e.png"
import Navigation from "../../components/utils/NavigationBar"
import CartService from "../../services/CartService";
import CustomerService from "../../services/CustomerService";
import OrderService from "../../services/OrderService";
import CoupenService from "../../services/Coupen.jsx"
import im from "../../Assets/image36.png"
import image1 from "../../Assets/Image 7.png"
import Image2 from "../../Assets/Image 11.png"
import Image3 from "../../Assets/longing.jpg"
import Image4 from "../../Assets/Image 10.png"

const cartServices = new CartService();
const customerServices = new CustomerService(); 
const orderServices =new OrderService();
const coupenServices = new CoupenService();


 class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            customerPanel: false,
            btn1: "visible",
            btn2: "visible",
            a: "hidden",
            summaryPanel: false,
            text: false,
            random: 0,
            count: 1,
            enableBtn: true,
            bookId:"",
            fullName: "", phoneNumber: "", pinCode: "", locality: "", address: "", city: "", landmark: "", emailID: "",
            name: " ", contact: " ", pincode: " ", locaLity: " ", addRess: " ", ciTy: " ", landMark: " ", Email: " ",
            nameError: "", numberError: "", pincodeError: "", localityError: "", addressError: "", cityError: "",
            landmarkError: "", emailError: "", err: "",
            checkoutData: [],
            cartDetails:'',
            changedCount: '',
            btnDisable: true,
            color: "grey",
            totalPrice: "",
            price:"",
            disableFlag: false,
            userDetails: [],
            userData:[],

            customerData: "",
            addressType: "",  
            orderID: '', visibilityOfDialogBox: false,
            index: 0,
            discountTotal: "", discountCoupon: 0, coupons: [], couponStatus: "", couponPrice: 0, coupon: "", index: 0
        }
    }

    localityValidation = (event, error) => {
        let localityPattern = "^[a-zA-Z]+"
        if (!event.target.value.match(localityPattern)) {
            this.setState({
                [event.target.id]: "Please enter valid location",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    pincodeValidation = (event, error) => {
        let pincodePattern = "[1-9]{1}[0-9]{2}[-]{0,1}[0-9]{3}$"
        if (!event.target.value.match(pincodePattern)) {
            this.setState({
                [event.target.id]: "Please enter a valid 6 digits zip code",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    addressValidation = (event, error) => {
        let addressPattern = "^\\w{1,150}"
        if (!event.target.value.match(addressPattern)) {
            this.setState({
                [event.target.id]: "Please enter Address between 150 character",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    cityValidation = (event, error) => {
        let cityPattern = "^[a-zA-Z]+"
        if (!event.target.value.match(cityPattern)) {
            this.setState({
                [event.target.id]: "Please enter valid city name",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        this.buttonVisibility()
    }

    handleCustomer = () => {
        this.setState({
            customerPanel: true,
            btn1: "hidden",
            disableFlag: true
        })
        this.state.disableFlag = true
        this.setTotalValue()
        this.discountCoupon()
    }

    getMyOrder = () => {
        orderServices.placedOrder(this.state.totalPrice).then(response => {
            this.setState({
                orderID: response.data.data
            }, () => this.props.history.push(`/Ordersuccess/${this.state.orderID}`))
        }).catch((error) => {
            console.log(error)
        })
    }


    handleSummary = () => {
        this.setState({
            summaryPanel: true,
            btn2: "hidden",
            a: "visible",
            text: true,
            disableFlag: true
        })
        this.state.disableFlag = true
        this.setTotalValue()
        this.buttonVisibility()
    }

    getDetails = () => {
        const data = {
            pincode: this.state.pincode,
            locality: this.state.locality,
            address: this.state.address,
            city: this.state.city,
            landmark: this.state.landmark,
            addressType: this.state.addressType,
        }
       
        customerServices.addCustomerDetails(data).then(response => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    
    }


    handleCheckOut = () => {

        this.getMyOrder()
        this.getDetails()
        this.addCoupon()


        
    }

    handleFocus = () => {
        this.setState({
            text: false,
            btn2: true,
            a: "hidden"
        })
    }

    getUser = () => {
       customerServices.customerDetails().then(response => {
        console.log("the response details are ",response);
        // this.setState({
        //     userData:response.data[0].userDetails
        // })
        // console.log("the state of userdata is ,",this.state.userData);
        this.setState({
            userDetails: response.data,  
        })
    }).catch((error) => {
        console.log(error)
    })
   
}
  getRegisteredUserDetails = ()=>{
     customerServices.getAllUserInformation().then(response => {
         console.log("the response details are of user registered ",response);
        this.setState({
            userData: response.data[0],
        })
       console.log("the userData state result after set State is ",this.state.userData);
    }).catch((error) => {
        console.log(error)
    })
  }

    componentDidMount() {
        this.handleCart()
        this.getUser()
        this.getRegisteredUserDetails()
        this.buttonVisibility()
    }
   

    handleCart = () => {
       
            cartServices.getMyCart().then(response => {
                console.log("response details ",response);
                this.setState({
                    checkoutData: response.data,
                });
            }).catch((error) => {
                this.setState({
                    checkoutData: []
                })
            });
           
        }
    

    

    formCheck() {
        return this.state.pincode.trim().length > 0 && this.state.locality.trim().length > 0 &&
            this.state.address.trim().length > 0 && this.state.city.trim().length > 0;
    }

    errorCheck() {
        return this.state.pinCode.trim().length === 0 && this.state.locaLity.trim().length === 0 &&
            this.state.addRess.trim().length === 0 && this.state.ciTy.trim().length === 0;
    }

    buttonVisibility() {
        if (this.errorCheck() && this.formCheck()) {
            this.setState({
                color: "maroon",
                btnDisable: false
            })
        } else {
            this.setState({
                color: "grey",
                btnDisable: true
            })
        }
    }









    handleClose = () => {
        this.setState({
            visibilityOfDialogBox: false
        })
    }

  

  handleTotalPrice = (data, status, price, index) => {
        this.setState({
            visibilityOfDialogBox: false,
            coupon: data,
            couponStatus: status,
            couponPrice: price,
            discountCoupon: (this.state.totalPrice - price) < 0 ? 0 : this.state.totalPrice - price,
            index: index
        })
    }


    discountCoupon = () => {
     coupenServices.getCoupon(this.state.totalPrice).then(response =>{
         console.log("respone to getcoupen ",response);
            this.setState({
                coupons: response.data.object
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    
    addCoupon = () => {
        coupenServices.addDiscountPrice(this.state.coupon, this.state.totalPrice).then(response => {
            console.log("response to add coupen ",response);
            this.setState({
                discountCoupon: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    

    handleCancel = () => {
        this.setState({visibilityOfDialogBox: false});
    }

    setTotalValue = () => {
        let newVar = this.state.checkoutData.map((books, index) => {
            return (books.bookDetailsModel.bookPrice * books.quantity)
        });
        this.state.totalPrice = newVar.reduce((a, b) => a + b)
        this.setState({
            discountCoupon: this.state.totalPrice
        })
       
        
       
    }

    getCoupon = () => {
        this.setState({
            visibilityOfDialogBox: true
        })
    }



    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });
        let cartData = this.state.checkoutData
        return (
            
            <div>
              <Navigation/>
                    <ul className="breadcrumb">
                        <li><a href="/">Home</a></li>
                        <li>My Cart</li>
                    </ul>

                    <Container id="cartcontainer" maxWidth="md">
                    <h4>My Cart ({cartData.length})</h4>
                    <Card className={cartData.length === 1 ? "bookdiv1" : "bookdiv"} variant="outlined">
                    <div className={cartData.length <= 2 ? "no-scroll" : "scrollbar"}>
                    {
                                    cartData.length > 0 ? cartData.map((books, index) => {
                                        console.log( cartData)
                                        return <CartItems flag={this.state.disableFlag}
                                                          handleSummary={this.setTotalValue}
                                                          key={books.id}
                                                        //   bookId={books.bookDetailsId}
                                                          price={books.totalPrice}
                                                          bookName={books.bookDetailsModel.bookName}
                                                          authorName={books.bookDetailsModel.authorName}
                                                          cartData={cartData}
                                                          handleCart={this.handleCart}
                                                          cartID={books.bookDetailsModel.bookId}
                                                          quantity={books.quantity}
                                                          books={books.bookDetailsModel}
                                                          image={books.bookDetailsModel.image} 
                                                          index={index}/>
                                    }) : <div className="nocartitems">
                                       <img className="noitemsimage" src={CartIsEmpty}
                                             alt="Cart Is Empty"/>
                                        <h3 id="emptycart">Please Add Books To Cart</h3>
                                    </div>
                                }
                                </div>
                                 <Button onClick={this.handleCustomer}
                                    style={cartData.length === 0 ? {visibility: "hidden"} : {visibility: this.state.btn1}}
                                    id="orderBtn">
                                Continue
                            </Button>

                    

                    </Card>
                    <Accordion className="customerdetails" variant="outlined"
                                        expanded={this.state.customerPanel}>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="summary"
                            >
                                <Typography id="customer-details">Customer Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Button id="editBtn" onClick={this.handleFocus}
                                        style={{visibility: this.state.a}}>Edit</Button>
                                <div className="customerdiv">
                                    <div className="textbox secondtext">
                                        <ThemeProvider theme={theme}>
                                            <TextFields
                                                InputLabelProps={{shrink: true}}
                                                value={this.state.userData.fullName}
                                                required={true}
                                                label="Name"
                                                id="name"
                                                name="customerName"
                                                variant="outlined"
                                                className="textfields" disabled
                                            />
                                            <TextFields
                                                InputLabelProps={{shrink: true}}
                                                value={this.state.userData.phoneNumber}
                                                required={true}
                                                label="Phone Number"
                                                id="contact"
                                                name="mobileNo"
                                                Text={this.state.contact}
                                                variant="outlined"
                                                className="textfields" disabled
                                            />
                                        </ThemeProvider>
                                    </div>

                                    <div className="textbox secondtext">
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.pincode}
                                            required={true}
                                            label="Pincode"
                                            id="pinCode"
                                            error={this.state.pincodeError}
                                            name="pincode"
                                            onChange={this.changeState}
                                            onBlur={(e) => this.pincodeValidation(e, "pincodeError")}
                                            helperText={this.state.pinCode}
                                            variant="outlined"
                                            className="textfields" disabled={this.state.text}
                                        />
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.locality}
                                            required={true}
                                            label="Locality"
                                            id="locaLity"
                                            className="locality-text"
                                            error={this.state.localityError}
                                            name="locality"
                                            onChange={this.changeState}
                                            onBlur={(e) => this.localityValidation(e, "localityError")}
                                            helperText={this.state.locaLity}
                                            variant="outlined"
                                            className="textfields" disabled={this.state.text}
                                        />
                                    </div>
                                    <div className="address">
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.address}
                                            required={true}
                                            style={{marginTop: "2%"}}
                                            multiline rows={2} fullWidth inputProps={{maxLength: 150}}
                                            label="Address"
                                            id="addRess"
                                            error={this.state.addressError}
                                            name="address"
                                            onChange={this.changeState}
                                            onBlur={(e) => this.addressValidation(e, "addressError")}
                                            helperText={this.state.addRess}
                                            placeholder={"Max 150 words"}
                                            variant="outlined"
                                            className="textfields1" disabled={this.state.text}
                                        />
                                    </div>
                                    <div className="secondtext">
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.city}
                                            required={true}
                                            label="City/Town"
                                            id="ciTy"
                                            error={this.state.cityError}
                                            name="city"
                                            onChange={this.changeState}
                                            onBlur={(e) => this.cityValidation(e, "cityError")}
                                            helperText={this.state.ciTy}
                                            variant="outlined"
                                            className="textfields" disabled={this.state.text}
                                        />
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.landmark}
                                            label="Landmark"
                                            id="landMark"
                                            name="landmark"
                                            variant="outlined"
                                            onChange={this.changeState}
                                            className="textfields" disabled={this.state.text}
                                        />
                                    </div>
                                    <div className="radiodiv">
                                        <Typography id="type-name">Type</Typography>
                                        <RadioGroup onChange={this.changeState} row aria-label="Type"
                                                    name="addressType" defaultValue="HOME">
                                            <FormControlLabel
                                                value="HOME"
                                                control={<Radio style={{fontSize: "80%", color: "rgb(160,48,55)"}}/>}
                                                label="Home"
                                                id="type-label"
                                                labelPlacement="end" disabled={this.state.text}
                                            />
                                            <FormControlLabel
                                                value="WORK"
                                                control={<Radio style={{fontSize: "80%", color: "rgb(160,48,55)"}}/>}
                                                label="Work"
                                                labelPlacement="end" disabled={this.state.text}
                                            />
                                            <FormControlLabel
                                                value="OTHER"
                                                control={<Radio style={{fontSize: "80%", color: "rgb(160,48,55)"}}/>}
                                                label="Other"
                                                labelPlacement="end" disabled={this.state.text}
                                            />
                                        </RadioGroup>
                                    </div>

                                    <Button onClick={this.handleSummary} id="customerBtn"
                                            disabled={this.state.btnDisable}
                                            style={{backgroundColor: this.state.color, visibility: this.state.btn2}}>
                                        Continue
                                    </Button>

                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="oredresummary" variant="outlined" expanded={this.state.summaryPanel}>
                            <AccordionSummary aria-controls="panel1a-content" id="details">
                                <Typography id="customer-details">Order Summary</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                            <div className="detailsblock">
                                    <div
 className={cartData.length === 1 ? "details-block" : cartData.length === 2 ? "no-scroll" : "scrollbar"}>
                                        {
                                            cartData.map((books, index) =>
                                            
                                                <div key={index}>
                                                    <div className="details-content">
                                                    <div>
                                                            < img src={books.bookDetailsModel.image==="../../Assets/image36.png"?im
                                                             :books.bookDetailsModel.image==="../../Assets/Image 7.png"?image1
                                                             :books.bookDetailsModel.image==="../../Assets/Image 11.png"?Image2
                                                             :books.bookDetailsModel.image==="../../Assets/longing.jpg"?Image3
                                                             :Image4
                                                             }  alt={"Not found"}
                                                                 className="img"/>
                                                        </div>
                                                        <div className="oredr-summary-books-div">
                                                            <Typography id="summary-bookname"
                                                                        component="h2">{books.bookDetailsModel.bookName}</Typography>
                                                            <Typography variant="body2" color="textSecondary"
                                                                        id="summary-authorname">{books.bookDetailsModel.authorName}</Typography>
                                                            <Typography component="h2"
                                                                        id="summary-cost">Rs. {books.totalPrice}</Typography>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <Divider/><br/>
                                                </div>
                                            )}

                                    </div>


                                
                                    <div className="coupon-div">
                                        <b>Coupons</b>
                                        <div className="coupon-div1">
                                            <LocalOfferOutlinedIcon id="offer-icon"/>
                                            {this.state.couponStatus === "applied" ?
                                                <div className="coupon-div1-sub">
                                                    <p className="coupon-sub-title">1 Coupon Applied</p>
                                                    <Button id="coupon-apply-btn" onClick={this.getCoupon}>Edit</Button>
                                                </div>
                                                :
                                                <div className="coupon-div1-sub">
                                                    <p className="coupon-sub-title">Apply Coupons</p>
                                                    <Button id="coupon-apply-btn"
                                                            onClick={this.getCoupon}>Apply</Button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div>
                                        <p><b>Price details</b></p>
                                        <div className="price-sub-div">
                                            <p> Sub Total Price: </p>
                                            <p className="sub-price">Rs. {this.state.totalPrice}</p>
                                        </div>
                                        <div className="price-sub-div">
                                            <p> Discount Price: </p>
                                            <p className="discount-price">Rs. {this.state.couponPrice}</p>
                                        </div>
                                        <hr className="horizontal-line"/>
                                        <div className="price-main-div">
                                            <b>Total price: </b>
                                            <b className="total-price">Rs.{this.state.discountCoupon}</b>
                                        </div>

                                    </div>

                                    <Button onClick={this.handleCheckOut} id="summryBtn">
                                        Place Order
                                    </Button>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Container>
                    <Dialog className="coupon-dialog-box" aria-labelledby="customized-dialog-title"
                            open={this.state.visibilityOfDialogBox} onClose={this.handleClose}>
                        <DialogContent id="dialoguecontent" id="customized-dialog-title">
                            <Coupon coupons={this.state.coupons} totalPrice={this.state.totalPrice}
                                    handleTotalPrice={this.handleTotalPrice} index={this.state.index}
                                    handleDialogVisibility={this.handleCancel}/>
                        </DialogContent>
                    </Dialog>
                    <FooterBar/>
                </div>
            );
    }
}

export default withRouter(Cart);