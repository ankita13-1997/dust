import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";

import '../Login/login.css';
import Card from "@material-ui/core/Card";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import girlcart from '../../Assets/Login.png';
import SnackBar from '../utils/SnakBar.js';
import SignIn from '../Login/login.jsx'
import UserService from '../../services/UserService';

 const userServices = new UserService();

 class signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            emailID: '',
            password: '',
            passWord: '',
            fullname: '',
            fullName: '',
            number: '',
            phoneNumber: '',
            emailError: '',
            passwordError: '',
            nameError: '',
            numberError: '',
            error: '',
            err: false,
            loginChecked: true,
            signupChecked: false,
            snackFlag: false, snackMessage: "", severity: 'success'
        }
    }
  
  

    fullNameValidation = (event, error) => {
        let fullNamePattern = "^[A-Z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$";
        if (!event.target.value.match(fullNamePattern)) {
            this.setState({
                [event.target.id]: "Enter valid name",
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

    emailValidation = (event, error) => {
        let emailPattern = "^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
        if (!event.target.value.match(emailPattern)) {
            this.setState({
                [event.target.id]: "Enter valid email id",
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

    passwordValidation = (event, error) => {
        let passwordPattern = "^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$";
        if (!event.target.value.match(passwordPattern)) {
            this.setState({
                [event.target.id]: "Enter valid password",
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

    numberValidation = (event, error) => {
        let phoneNumberPattern = "^[9]{1}[1]{1}[7896]{1}[0-9]{9}$";
        if (!event.target.value.match(phoneNumberPattern)) {
            this.setState({
                [event.target.id]: "Enter valid phone number",
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

    handleChoice = ({target}) => {
        if ([target.name].includes("login")) {
            this.setState({loginChecked: true, signupChecked: false})
        }
        if ([target.name].includes("signup")) {
            this.setState({loginChecked: false, signupChecked: true})
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

     userRegistration = () => {
       
        const registerData = {
            fullName: this.state.fullName,
            emailID: this.state.emailID,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber
        }



        console.log("user info is " ,registerData);
        userServices.userRegistration(registerData).then(response => {
            let severity = response.data.message === "USER ADDED SUCCESSFULLY: " ? "success" : "error"
            severity === "success" ? this.snackStateMessage(response.data.message, severity) : this.snackStateMessage(response.data.message, severity);
            this.clear()
        }).catch(error => {
            console.log(error)
        })

    

       
    }

    clear = () => {
        if (this.state.severity === "success") {
            setTimeout(() => {
                this.setState({
                    emailId: '',
                     emailID: '',
                    password: '',
                     passWord: '',
                     fullname: '',
                    fullName: '',
                    number: '',
                    phoneNumber: '',
                    emailError: '',
                    passwordError: '',
                    nameError: '',
                    numberError: '',
                    error: '',
                    err: false,
                    loginChecked: true,
                    signupChecked: false,
                    snackFlag: false, snackMessage: "", severity: 'success'
                })
            }, 3000);
        } else {
            setTimeout(() => {
                this.setState({
                    snackFlag: false, snackMessage: "", severity: 'error'
                })
            }, 3000);
        }
    }
   snackStateMessage = (response, severityLevel) => {
        this.setState({
            snackMessage: response,
            snackFlag: true,
            severity: severityLevel,
        },()=>this.clear())
    }

    
render(){

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#a52a2a',
            },
        },
    });
    
    const choicetab = window.location.href.includes('../Login/login.jsx')
    return(
         <div className="User_details_form" style={choicetab ? {background: "#b3b3b3"} : {background: "transparent"}}>
             <div className="user-login-form">
                    <Card className="form-box" style={{borderRadius: "5%", backgroundColor: "#f2f2f2"}}>
                       <img src={girlcart} alt="IMAGE not" className="login-img"/>
                        <div style={{marginLeft: "76px", marginTop: "3%"}}>
                            <h3 style={{fontWeight: "bold"}}>
                                 THE ONLINE BOOK STORE
                            </h3>
                        </div>
                    </Card>

        <Card className="login-box" style={{borderRadius: "2%", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.5)"}}>
            
        <div className="login-wrap">
        <div className="login-html">
        <input id="tab-1" type="radio" name="login" className="sign-in"
            checked={this.state.loginChecked} onChange={this.changeState} onClick={this.handleChoice}/><label
            htmlFor="tab-1" className="tab1">SIGN IN</label>
            <input id="tab-2" type="radio" name="signup" className="sign-up"
            checked={this.state.signupChecked} onChange={this.changeState} onClick={this.handleChoice}/>
        <label htmlFor="tab-2" className="tab2">SIGN UP</label> 
        <div className="login-form">
        <SignIn snack={this.snackStateMessage}/>
        <div className="sign-up-htm">
            <ThemeProvider theme={theme}>
             <div className="group">
           <TextField
               id="fullname"
               name="fullName"
               label="Full Name"
               variant="outlined"
               value={this.state.fullName}
               fullWidth required autoComplete="off"
               error={this.state.nameError}
               onChange={this.changeState}
               onBlur={(e) => this.fullNameValidation(e, "nameError")}
               helperText={this.state.fullname}
           />
          
              </div>

              <div className="group">
            <TextField
               id="emailId"
               name="emailID"
               label="EMAIL ID"
               variant="outlined"
               value={this.state.emailID}
               fullWidth required autoComplete="off"
               error={this.state.emailError}
               onChange={this.changeState}
               onBlur={(e) => this.emailValidation(e, "emailError")}
               helperText={this.state.emailId}
           />
            
            </div>
            <div className="group">
            <TextField
               id="passWord"
               name="password"
               label="PASSWORD"
               variant="outlined"
               value={this.state.password}
               fullWidth required autoComplete="off"
               error={this.state.passwordError}
               onChange={this.changeState}
               onBlur={(e) => this.passwordValidation(e, "passwordError")}
               helperText={this.state.passWord}
           />
           </div>
            
           <div className="group">
            <TextField
               id="number"
               name="phoneNumber"
               label="CONTACT NUMBER"
               variant="outlined"
               value={this.state.phoneNumber}
               fullWidth required autoComplete="off"
               error={this.state.numberError}
               onChange={this.changeState}
               onBlur={(e) => this.numberValidation(e, "numberError")}
               helperText={this.state.number}
           />
           </div>
           

           <div className="group">
             <button className="login-button" onClick ={this.userRegistration}>SIGN UP</button>
            </div>

        </ThemeProvider>
        </div>
       </div>
       </div>
       </div>
       </Card>
     </div>
     {this.state.snackFlag &&
        <SnackBar message={this.state.snackMessage} severity={this.state.severity}/>}
     </div>
       
       
    );
  
}
                 
        
}
    
export default signup;





