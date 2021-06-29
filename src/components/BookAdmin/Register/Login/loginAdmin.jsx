import React from 'react';
import { Link, withRouter } from "react-router-dom";

import '../Login/login.css';
import Card from "@material-ui/core/Card";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import girlcart from '../../../../Assets/Login.png';
import SnackBar from '../../../utils/SnakBar.js'
import UserService from '../../../../services/UserService';

const userServices = new UserService();


 class loginAdmin extends React.Component {

    constructor(props) {
            super(props);
            this.state = {
                emailId: '',
                password: '',
                emailID: '',
                Password:'',
                emailError:'',
                passwordError:'',
                error:'',
                err:false,
                
                
            }


        }

        

        emailValidation=(event,error)=>{
            let emailPattern="^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            if(!event.target.value.match(emailPattern)){
                this.setState({
                    [event.target.id]: "Enter valid email id",
                    [error]: `Invalid ${event.target.name}`,
                    err: true,
                })
            }
            else {
                this.setState({
                    [event.target.id]: " ",
                    [error]:"",
                    err: false,
                })
            }
        }

        passwordValidation=(event,error)=>{
            let passwordPattern="^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"
            if(!event.target.value.match(passwordPattern)){
                this.setState({
                    [event.target.id]: "Enter valid password",
                    [error]: `Invalid ${event.target.name}`,
                    err: true,
                })
            }
            else {
                this.setState({
                    [event.target.id]: " ",
                    [error]:"",
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

                const loginOrLogout =  window.location.href.includes('/login')

                console.log("added SignIn ",loginData);
                userServices.userLogin(loginData).then(response=>{

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
          <div className = "sign-in-htm">
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
               onBlur={(e)=>this.emailValidation(e,"emailError")}
               helperText={this.state.emailId}

              />
            </div>
            <div className="group">
            
              <TextField 
               id="Password"
               name="password"
               label="PASSWORD"
               variant="outlined"
               type="password"
               value={this.state.password}
               fullWidth required autoComplete="off"
               error={this.state.passwordError}
               onChange={this.changeState}
               onBlur={(e) => this.passwordValidation(e, "passwordError")}
               helperText={this.state.Password}
               
               />
            </div>

            <div className="foot-lnk">
                <a href="/Forgetpassword">Forgot Password?</a>
            </div>

            <div className="group">

                 <Link to="/homepage"> 
            <button className="login-button" onClick={this.userLogin}>SIGN IN</button>
                </Link> 

            </div>
           </ThemeProvider>
          </div>
          {this.state.snackFlag &&
            <SnackBar message={this.state.snackMessage} severity={this.state.severity} />
           }
          </div>
          
         
          
        )
    }
}

export default withRouter(loginAdmin);