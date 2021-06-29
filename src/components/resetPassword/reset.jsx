import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import   '../resetPassword/reset.css';
import CustomSnackBar from "../utils/SnakBar";
import UserService from '../../services/UserService';

const userServices = new UserService();
export default class reset extends Component{
    constructor(props){
        super(props);
        this.state={
            password:"",
            passWord:"",
            confirmPassword:'',
            confirmPassWord:'',
            confirmPasswordError:"",
            newPasswordError:"",
            error:'',
            errorStatus:false,
            snackFlag: false,
            severity: "error",
            snackMessage: "",
            new:"",
            confirm:"",
            userId:'',

        }
    }
    componentDidMount() {
        this.state.userId = this.props.match.params.token;
        console.log("token is",this.state.userId)
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    checkPassword = (event,error) => {
        if(this.state.password !== event.target.value){
            this.setState({
                [event.target.id]:"Password Does Not Match",
                [error]: `Invalid ${event.target.name}`,
                errorStatus: true,
            })
        }
        if(this.state.password === event.target.value){
            this.setState({
                [event.target.name]: event.target.value,
                [event.target.id]:" ",
                confirmPasswordError: "",
                errorStatus: false,
            })
        }
        this.setState({
            [event.target.name]: event.target.value,
            confirmPasswordError: " ",
            errorStatus: false,
        })
    }

    passwordValidation=(event,error)=>{
        let passwordPattern="^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$"
        if(!event.target.value.match(passwordPattern)){
            this.setState({
                [event.target.id]: "Enter valid password",
                [error]: `Invalid ${event.target.name}`,
                errorStatus: true,
            })
        }
        else {
            this.setState({
                [event.target.id]: " ",
                [error]:"",
                errorStatus: false,
            })
        }
    }
    snackStateMessage = (response, severityLevel) => {
        this.setState({
            snackMessage: response,
            snackFlag: true,
            severity: severityLevel,
        },()=>this.clear())
    }
    getDetails = ()=> {
        if(this.state.password === this.state.confirmPassWord){
            
            userServices.resetNewPassword(this.state.password,this.state.userId).then(response =>{
                this.setState({
                    severity:response.data.message==="Password Has Been Reset" ? "success" : "error",
                    snackMessage:response.data.message,
                    snackFlag:true
                })


            }).catch((error) =>{
                console.log(error)
            })
        }

        else {

            this.setState({
                severity: "error",
                snackMessage:"Password does not match",
                snackFlag:true
            })
        }
        this.clear()
    }

    clear=()=>{
        setTimeout(() => {
            if(this.state.severity === "success"){
                { this.props.history.push("/signup")}
            }else {
                this.props.history.push("/signup")
            }
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

       return(
         <div>
           <div className="forgotmain">
           <div id="forgotdiv">  
           <h1>Reset Your Password</h1>  
           <Card id="resetcard" variant="outlined">
           <CardContent>
            <div id="resetContent">
            <div id="resetPassword">

              <ThemeProvider theme={theme}>
               <TextField 
                          id="new"
                          name="password"
                          label="New Password"
                          variant="outlined"
                          value={this.state.password}
                          fullWidth required autoComplete="off"
                          onChange={this.changeState}
                          error={this.state.newPasswordError}
                          onChange={this.changeState}
                          onBlur={(e)=>this.passwordValidation(e,"newPasswordError")}
                          helperText={this.state.new}
                         
                />

                <TextField id="confirm"
                           name="confirmPassWord"
                           label="Confirm Password"
                           variant="outlined"
                           value={this.state.password}
                           fullWidth required autoComplete="off"
                           onChange={this.changeState}
                           value={this.state.confirmPassWord}
                           fullWidth required autoComplete="off"
                           error={this.state.confirmPasswordError}
                           onChange={(e)=>this.checkPassword(e,"confirmPasswordError")}
                           onBlur={(e)=>this.passwordValidation(e,"confirmPasswordError")}
                           helperText={this.state.confirm}
                        />

                          <div>
                            <Button id="resetbtn" onClick={this.getDetails}>Reset Password</Button>
                         </div>
            </ThemeProvider>
           </div>
           </div> 
           </CardContent> 
           </Card> 
           </div>         
          </div>
          {this.state.snackFlag &&
                <CustomSnackBar message={this.state.snackMessage} severity={this.state.severity}/>
                }
          </div>
            
       );
 }

}