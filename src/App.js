import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/Signup/signup.jsx"
import Login from "./components/Login/login.jsx"
import Reset from "./components/resetPassword/reset.jsx"
import Verify from "./components/verification/Accountverify.jsx"
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx"
import Cart from "./components/Cart/Cart.jsx"
import CartItem from "./components/Cart/CartItems.jsx"
import OrderSuccessfull from "./components/Order/OrderSuccessfull"
 import Adminup from "./components/BookAdmin/Register/Signup/signupAdmin.jsx"
import BookStoreHomePage from "./components/BookStoreHomePage/BookStoreHomePage"
import BookCart from "./components/utils/BookCustomCard.jsx";
import Wishlist from "./components/WishlistPage/Wishlist"
import MyOrdersList from "./components/MyOrder/MyOrderList"
import Profile from "./components/Profile/profile"
import Homeadmin from "./components/BookAdmin/DashBoard/AdminHomePage.jsx";

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className="App">
        <Router>
          <Switch>
            <Route path="/signup"><SignUp /></Route>

            <Route path="/login"><Login /></Route>

            <Route path="/reset/:token" component={Reset} />
             
            <Route path="/verify/:token"><Verify /></Route>

            <Route path="/Forgetpassword"><ForgetPassword /></Route>

            <Route path="/cart"><Cart/></Route>

            <Route path="/cartitem"><CartItem/></Route>
          
          

            <Route path="/homepage"><BookStoreHomePage /></Route>

            <Route path="/Ordersuccess"><OrderSuccessfull /></Route>

            <Route path="/whishlist"><Wishlist /></Route>

            <Route path="/myprofile"><Profile /></Route>

            {/* <Route path="/myorder"><MyOrdersList /></Route> */}
            <Route path={"/myorder"} component={MyOrdersList} exact/>

            <Route path="/adminup"><Adminup /></Route>

            <Route path="/adminhomepage"><Homeadmin /></Route>
            </Switch>
        </Router>
        </div>
      </div>
    );
  }
}

export default App;