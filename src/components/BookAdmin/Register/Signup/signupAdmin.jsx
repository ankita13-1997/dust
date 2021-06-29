import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";

import '../Login/login.css';
import Card from "@material-ui/core/Card";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import girlcart from '../../../../Assets/Login.png';
import SnackBar from '../../../utils/SnakBar.js'
// import SignIn from '../Login/loginAdmin.jsx'
import AdminService from '../../../../services/AdminService';

 const adminServices = new AdminService();

 class signupAdmin extends React.Component {

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

   
    


    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    userLogin=()=>{
        const loginData={
            emailID:this.state.emailID,
            password:this.state.password,
        }
        console.log("login data ",loginData);

        const loginOrLogout =  window.location.href.includes('/adminup')

        console.log("added SignIn ",loginData);
        adminServices.adminLogin(loginData).then(response=>{

            console.log("user rsponse",response.data.object);
            console.log("data ",response.data );
            console.log(response);
            console.log(response.data.message);

           let responseMessage = response.data.message;
           console.log("responseMessage",responseMessage);
            let severity=""
            if(responseMessage == "LOGIN SUCCESSFUL")
            {
                severity= "success";
                console.log("seve",severity);
            }
            else{
                severity= "error";
                console.log("error sev", severity);
            }
            console.log("after",severity);
        
            if(severity=="success")
            {
                this.props.snack(response.data.message,severity);
                localStorage.setItem('Authorization',response.data.object);
                localStorage.setItem('fullName',response.data.fullname); 

            }
            else{
                this.props.snack(response.data.message,severity);
                localStorage.setItem('Authorization Fail',response.data.object) 


            }
           
            !loginOrLogout ? window.location.reload(true) : this.clear(severity)

            
        }).catch(error=>{
            console.log(error)
        })
    }


    clear=(severity)=>{
        if(severity === "success")
        {
            setTimeout(() => {
                this.setState({
                    emailId:' ',
                    emailError:'',
                    passwordError:'',
                    password:'',
                    emailID:'',
                    passWord:'',
                    error:'',
                    err:false,
                    snackFlag: false, snackMessage: "",severity:'success'
                },()=>this.props.history.push(`/homepage`))
            }, 3000);
        }
        if(severity === "error"){
            setTimeout(() => {
                this.setState({
                    snackFlag: false, snackMessage: "",severity:'error'
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
    
    
    return(
         <div className="User_details_form" 
          style={{background:"#b3b3b3"}}
        >
             <div className="user-login-form">
                    <Card className="form-box" style={{borderRadius: "5%", backgroundColor: "#f2f2f2"}}>
                       <img src={girlcart} alt="IMAGE not" className="login-img"/>
                        <div style={{marginLeft: "76px", marginTop: "3%"}}>
                            <h3 style={{fontWeight: "bold"}}>
                            ONLINE BOOK STORE(ADMIN)
                            </h3>
                        </div>
                    </Card>

        <Card className="login-box" style={{borderRadius: "2%", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.5)"}}>
            
        <div className="login-wrap">
        <div className="login-html">
        {/* <input id="tab-1" type="radio" name="login" className="sign-in"/> */}
        <label htmlFor="tab-2" className="tab2">SIGN IN</label> 
        <div className="login-form">
        <div snack={this.snackStateMessage}/>
        <div className="pickme">
            <ThemeProvider theme={theme}>
          

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
             <button className="login-button" onClick ={this.userLogin}>SIGN IN</button>
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
    
export default signupAdmin;





