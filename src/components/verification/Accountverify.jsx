import React, { useState } from 'react';
import '../verification/Accountverify.css'
import { Link, withRouter } from "react-router-dom";
import UserService from '../../services/UserService.js';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import tick  from "../../Assets/tick.jpg";
import FooterBar from "../utils/FooterBar.jsx";

 const userServices = new UserService();

class Accountverify extends React.Component{
verifyEmail =() => {
    let token = this.props.match.params.token;
    userServices.verifyuser(token).then(data => {
        console.log("the data of varify ",data);
    }).catch(response=>{
        console.log(response)
    })

   
    

}

componentDidMount() {
    this.verifyEmail();
}

routeChange = () => {
    this.props.history.push("/signup")
}

  render(){
      return(
          <div>
               <Container className="verificationdiv">
              <div className="loginverificationdiv">
              <img src={tick} alt={"Verified"} className="verificationimg"/>   
              <Typography variant="body2" color="textSecondary" component="p" id="verificationtypo">Congratulations! Your email address has been verified.</Typography>   
              <button id="loginverificationbtn" onClick={this.routeChange}>VERIFY ACCOUNT</button>
              </div>
              </Container>
              <FooterBar/>
          </div>
      );

  }

}

export default withRouter(Accountverify);