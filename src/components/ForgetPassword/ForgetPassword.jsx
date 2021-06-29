import React from 'react';
import TextField from '@material-ui/core/TextField';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import '../ForgetPassword/ForgetPassword.css';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {Link} from "react-router-dom";
import UserService from '../../services/UserService.js';
import NavigationBar from '../utils/NavigationBar'
import Footer from '../utils/FooterBar'

const userServices = new UserService();
export default class ForgetPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            emailID:'',
            status1:false,
            helperText1:' ',
            snackbaropen: false,
            snackbarmsg: '',
            severity: "",
        }
    }

    snackbarClose = () => {
        this.setState({snackbaropen: false});
    };

    handleChange=(e)=>{
        this.setState({emailID:e.target.value},()=>{ this.emailValidation()})
    }

    emailValidation(){
        this.setState({
            status1:true,
            helperText1:'Required*'
        })
        var emailPattern=/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        this.setState({
            emailID: this.state.emailID.trim()
        })
        if(this.state.emailID.trim()!==""){
            if(emailPattern.test(this.state.emailID)===false){
                this.setState({
                    status1:true,
                    helperText1:'Enter Valid Email ID',
                })
            } else{
                this.setState({
                    status1:false,
                    helperText1:' ',
                })
            }
        }
    }

   sendMAilForResetPassword =() =>{
       userServices.passwordService(this.state.emailID).then(response=>{
        this.setState({
            severity:response.data.message==="Reset Password Link Has Been Sent To Your Email Address" ? "success" : "error",
            snackMessage:response.data.message,
            snackFlag:true,
            emailID:response.data.message==="Reset Password Link Has Been Sent To Your Email Address" ? " " : this.state.emailID
        })
    }).catch((error) =>{
        console.log(error)
    })
    this.clear()
}
clear=()=>{
    setTimeout(() => {
        this.setState({
            snackFlag: false,
        })
    }, 2000);
}

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });
        return (
            <div>
            <div className="forgot-container-wrapper">
                <NavigationBar />
                 <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.snackbaropen}
                          autoHideDuration={4000} onClose={this.snackbarClose}>
                    <Alert onClose={this.snackbarClose} severity={this.state.severity} variant={"filled"}>
                        {<span id="message-id">{this.state.snackbarmsg}</span>}
                    </Alert>
                </Snackbar>
                <div className="MainForget">
                <div className="forgot-header">
                        <h1>Forgot Your Password?</h1>
                </div>
                <div className="forgot-container">
                        <div className="forgot-email-form">
                            <div className="paragraph">
                                <p className="forgot-password-paragraph" style={{opacity: 0.7}}>Enter your email address and we'll send you a link to reset your password.</p>
                            </div>
                            <div className="forgot-textfield">
                                <ThemeProvider theme={theme}>
                                    <TextField error={this.state.status1} helperText={this.state.helperText1}
                                               className="forgot-password-textfield"  
                                               label="Email"
                                               value={this.state.emailID} variant="outlined" onChange={this.handleChange}/>
                                </ThemeProvider>
                                <button className="forgot-submit-button" onClick={this.sendMAilForResetPassword}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                    <div className="create-account">
                        <Link to="/signup" >
                            <button className="forgot-create-button">CREATE ACCOUNT</button>
                        </Link>
                    </div>
                </div>
              
            </div>
              <Footer/>
              </div>
        );
    } 
}