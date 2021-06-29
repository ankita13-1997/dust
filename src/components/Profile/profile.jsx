import React, { Component } from 'react'
import NavigationBar from '../utils/NavigationBar'
import Footer from '../utils/FooterBar';
import "../Profile/profile.css"
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextFields from "../utils/CustomTextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import CustomerService from "../../services/CustomerService";

const customerServices = new CustomerService(); 

export default class profile extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            btnDisable: true,
            fullName: "", phoneNumber: "", pinCode: "", locality: "", address: "", city: "", landmark: "", emailID: "",
            name: " ", contact: " ", pincode: " ", locaLity: " ", addRess: " ", ciTy: " ", landMark: " ", Email: " ",
            nameError: "", numberError: "", pincodeError: "", localityError: "", addressError: "", cityError: "",
            landmarkError: "", emailError: "", err: "",password: "",
            userDetails: [],
            userData:[],
            customerData: []
        }
    }

    // localityValidation = (event, error) => {
    //     let localityPattern = "^[a-zA-Z]+"
    //     if (!event.target.value.match(localityPattern)) {
    //         this.setState({
    //             [event.target.id]: "Please enter valid location",
    //             [error]: `Invalid ${event.target.name}`,
    //             err: true,
    //         })
    //     } else {
    //         this.setState({
    //             [event.target.id]: " ",
    //             [error]: "",
    //             err: false,
    //         })
    //     }
    // }

    // pincodeValidation = (event, error) => {
    //     let pincodePattern = "^[1-9]{1}[0-9]{2}[-]{0,1}[0-9]{3}$"
    //     if (!event.target.value.match(pincodePattern)) {
    //         this.setState({
    //             [event.target.id]: "Please enter a valid 6 digits zip code",
    //             [error]: `Invalid ${event.target.name}`,
    //             err: true,
    //         })
    //     } else {
    //         this.setState({
    //             [event.target.id]: " ",
    //             [error]: "",
    //             err: false,
    //         })
    //     }
    // }

    // addressValidation = (event, error) => {
    //     let addressPattern = "^\\w{1,150}"
    //     if (!event.target.value.match(addressPattern)) {
    //         this.setState({
    //             [event.target.id]: "Please enter Address between 150 character",
    //             [error]: `Invalid ${event.target.name}`,
    //             err: true,
    //         })
    //     } else {
    //         this.setState({
    //             [event.target.id]: " ",
    //             [error]: "",
    //             err: false,
    //         })
    //     }
    // }

    // cityValidation = (event, error) => {
    //     let cityPattern = "^[a-zA-Z]+"
    //     if (!event.target.value.match(cityPattern)) {
    //         this.setState({
    //             [event.target.id]: "Please enter valid city name",
    //             [error]: `Invalid ${event.target.name}`,
    //             err: true,
    //         })
    //     } else {
    //         this.setState({
    //             [event.target.id]: " ",
    //             [error]: "",
    //             err: false,
    //         })
    //     }
    // }

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

     getCustomerDetails = () =>{
         customerServices.customerDetails().then(response => {
            console.log("the response details are of Customer ",response);
           this.setState({
               customerData: response.data[0],
           })

     }).catch((error) => {
        console.log(error)
    })
} 






     componentDidMount() {
        // this.handleCart()
        // this.getUser()
        this.getRegisteredUserDetails()
        // this.buttonVisibility()
        this. getCustomerDetails()
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
        // this.setTotalValue()
        this.buttonVisibility()
    }

    // getDetails = () => {
    //     const data = {
    //         pincode: this.state.pincode,
    //         locality: this.state.locality,
    //         address: this.state.address,
    //         city: this.state.city,
    //         landmark: this.state.landmark,
    //         addressType: this.state.addressType,
    //     }
       
    //     customerServices.addCustomerDetails(data).then(response => {
    //         console.log(response)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    
    // }

    // handleCheckOut = () => {
    //     this.getDetails()
    //     this.buttonVisibility()
        
    // }

    getUser = () => {
        customerServices.customerDetails().then(response => {
         console.log("the response details are ",response);
         this.setState({
             userDetails: response.data,  
         })
     }).catch((error) => {
         console.log(error)
     })
    
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

// handleCheckOut = () => {

//     this.getDetails()
    
// }


    render(){
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });
        return(
            <div>
                <div className="main-order">
                <NavigationBar/>
                    <ul className="breadcrumb">
                        <li><a href="/">Home</a></li>
                        <li>My Profile</li>
                    </ul>
                    <Container id="cartcontainer" maxWidth="md">
                    <Card className="bookdiv1" style={{height:"90%"}}variant="outlined">
                    <h4>Personal Details</h4>
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
                                         </ThemeProvider>
                                    </div>
                                    <div className="textbox secondtext">
                                        <ThemeProvider theme={theme}>
                                            <TextFields
                                                InputLabelProps={{shrink: true}}
                                                value={this.state.userData.emailID}
                                                required={true}
                                                label="Email id"
                                                id="Email id"
                                                name="Email id"
                                                // Text={this.state.emailID}
                                                variant="outlined"
                                                className="textfields" disabled
                                                // fullWidth required autoComplete="off"
                                            />
                                         </ThemeProvider>
                                    </div>
                                    <div className="textbox secondtext">
                                        <ThemeProvider theme={theme}>
                                            <TextFields
                                                InputLabelProps={{shrink: true}}
                                                value={this.state.userData.password}
                                                required={true}
                                                label="Password"
                                                id="Password"
                                                name="Password"
                                                type="password"
                                                // Text={this.state.password}
                                                variant="outlined"
                                                className="textfields" disabled
                                                // fullWidth required autoComplete="off"
                                            />
                                         </ThemeProvider>
                                    </div>
                                    <div className="textbox secondtext">
                                        <ThemeProvider theme={theme}>
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
                                   
                        </div>
                    </Card>
                    <Accordion className="customerdetails" variant="outlined"
                                        // expanded={this.state.customerPanel}
                                        >
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="summary"
                            >
                                <Typography id="customer-details">Address Details
                                {/* <Button color="secondary">Edit</Button> */}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* <Button id="editBtn"
                                //  onClick={this.handleFocus}
                                        // style={{visibility: this.state.a}}
                                        >Edit</Button> */}
                                <div className="customerdiv">
                                <div className="address">
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.customerData.address}
                                            required={true}
                                            style={{marginTop: "2%"}}
                                            multiline rows={2} fullWidth inputProps={{maxLength: 150}}
                                            label="Address"
                                            id="address"
                                            // error={this.state.addressError}
                                            name="address"
                                            // onChange={this.changeState}
                                            // onBlur={(e) => this.addressValidation(e, "addressError")}
                                            // helperText={this.state.addRess}
                                            // placeholder={"Max 150 words"}
                                            variant="outlined"
                                            className="textfields1" 
                                            // disabled={this.state.text}
                                        />
                                    </div>
                                    <div className="textbox secondtext">
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            // value={this.state.pincode}
                                            value={this.state.customerData.pinCode}
                                            
                                            required={true}
                                            label="Pincode"
                                            id="pinCode"
                                            // error={this.state.pincodeError}
                                            name="pincode"
                                            // onChange={this.changeState}
                                            // onBlur={(e) => this.pincodeValidation(e, "pincodeError")}
                                            // helperText={this.state.pinCode}
                                            variant="outlined"
                                            className="textfields" 
                                            // disabled={this.state.text}
                                        />
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.customerData.locality}
                                            required={true}
                                            label="Locality"
                                            id="locaLity"
                                            className="locality-text"
                                            // error={this.state.localityError}
                                            name="locality"
                                            // onChange={this.changeState}
                                            // onBlur={(e) => this.localityValidation(e, "localityError")}
                                            // helperText={this.state.locaLity}
                                            variant="outlined"
                                            className="textfields" 
                                            // disabled={this.state.text}
                                        />
                                    </div>
                                   
                                    <div className="secondtext">
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.customerData.city}
                                            required={true}
                                            label="City/Town"
                                            id="ciTy"
                                            // error={this.state.cityError}
                                            name="city"
                                            // onChange={this.changeState}
                                            // onBlur={(e) => this.cityValidation(e, "cityError")}
                                            // helperText={this.state.ciTy}
                                            variant="outlined"
                                            className="textfields" 
                                            // disabled={this.state.text}
                                        />
                                        <TextFields
                                            InputLabelProps={{shrink: true}}
                                            value={this.state.customerData.landmark}
                                            label="Landmark"
                                            id="landMark"
                                            name="landmark"
                                            variant="outlined"
                                            onChange={this.changeState}
                                            className="textfields" 
                                            // disabled={this.state.text}
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
                                                labelPlacement="end"
                                                //  disabled={this.state.text}
                                            />
                                            <FormControlLabel
                                                value="WORK"
                                                control={<Radio style={{fontSize: "80%", color: "rgb(160,48,55)"}}/>}
                                                label="Work"
                                                labelPlacement="end" 
                                                // disabled={this.state.text}
                                            />
                                            <FormControlLabel
                                                value="OTHER"
                                                control={<Radio style={{fontSize: "80%", color: "rgb(160,48,55)"}}/>}
                                                label="Other"
                                                labelPlacement="end" 
                                                // disabled={this.state.text}
                                            />
                                        </RadioGroup>
                                    </div>

                                    {/* <Button 
                                    onClick={this.handleCheckOut}
                                    id="customerBtn"
                                    style={{width: "40%" , right: "15%"}}
                                            disabled={this.state.btnDisable}
                                            style={{backgroundColor: this.state.color, visibility: this.state.btn2}}
                                            >
                                        Add New Address
                                    </Button> */}

                                </div>
                            </AccordionDetails>
                        </Accordion>

                    </Container>
                   
                <Footer/>
                </div>
            </div>
        );
    }
}
