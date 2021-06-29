import React from "react";
import '../../../utils/navigationbar.css';
import {Link} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import PersonIcon from '@material-ui/icons/Person';
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import LoginPage from "../../Register/Signup/signupAdmin";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

export default class AdminNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText1: "",
            counter: 0,
            visiblityValueOfLogin: 'hidden',
            visiblityOfDialogBox: false,
            visibilityOfCloseIcon: 'hidden',
            isLoggedIn: false
        }
    }

    // handleSearchbar = () => {
    //     this.setState({
    //         searchVisibility: true
    //     })
    // }

    // getText = (event) => {
    //     this.props.test(event.target.value)
    // }

    handleBadgeCount(value, updateFactor) {
        if (updateFactor === "updateButton")
            this.setState({
                counter: value
            })
        if (updateFactor === "addButton") {
            this.setState({
                counter: this.state.counter + 1
            })
        }
    }

    handleChange = (event) => {
        this.setState({searchText1: event.target.value}, () => {
            this.props.getSearchedText(this.state.searchText1)
        })
    }

    handleLoginBoxVisiblity = (event) => {
        if (`${this.state.visiblityValueOfLogin}` === "hidden") {
            this.setState({visiblityValueOfLogin: "visible"})
            return;
        }
        if (`${this.state.visiblityValueOfLogin}` === "visible") {
            this.setState({visiblityValueOfLogin: "hidden"})
            return;
        }
    }
    
    handleDialogueBoxVisiblity = (event) => {
        this.setState({visiblityOfDialogBox: true, visibilityOfCloseIcon: "visible"})
    }

    handleLogoutBoxVisibility = () => {
        this.setState({isLoggedIn: false, visiblityValueOfLogin: 'hidden'})
        localStorage.removeItem('Authorization')
        localStorage.removeItem('data')
        window.location.reload(true)
    }
    
    componentDidMount() {
        this.isLoggedIn();
    }

    isLoggedIn = () => {
        let user = localStorage.getItem('Authorization');
        if (user) {
            this.setState({
                isLoggedIn: true
            })
        }
        if (user == "null" || user == "undefined") {
            this.setState({
                isLoggedIn: false
            })
        }
    }
    
render(){
    const url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    return(
        <AppBar id="App-header">
            <Dialog className="maindialoguebox" aria-labelledby="customized-dialog-title"
                        open={this.state.visiblityOfDialogBox}>
                    <DialogContent className="dialoguecontent" id="customized-dialog-title">
                        <LoginPage getClickFlag={this.setClickFlag}/>
                    </DialogContent>
                </Dialog>
            <Toolbar id="toolbar">
                <ImportContactsIcon id="App-icon"/>
                    <Link style={{color: 'white', textDecoration: 'none'}} to={'/homepage'}>
                        <Typography id="Headers-font">
                            BookStore
                        </Typography>
                    </Link>
                <div id="searchbar" className="search search_bar"
                    style={url === '' ? {visibility: "visible"} : {visibility: "visible"}}>
                    <div className="searchIcon"  style={{bottom:'33%'}}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        id="searchText"
                        style={{left:'10%'}}
                        placeholder="Search"
                        value={this.state.searchText}
                        onChange={(event) => this.getText(event)}
                    />
                </div>

                <div className="grow"/>
                    <div className="logoutDiv">
                        <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                                <div>
                                    <IconButton id="profileIcon" color="inherit" style={{right:'200%',border: "2px solid rgb(145, 10, 10)"}}>
                                        <PersonIcon variant="contained" {...bindTrigger(popupState)}>
                                        </PersonIcon>
                                    </IconButton>
                                    <Popover
                                        style={{marginTop: "38px"}}
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    > {!this.state.isLoggedIn ?
                                        <div className="loginPopUp">

                                            <h6>Welcome</h6>
                                            <Typography style={{fontSize: "small", marginTop: "2px"}} color="textSecondary" gutterBottom
                                                className="gutterbottomfont">
                                                    To access the account and manage orders 
                                            </Typography>
                                                <Button className="loginSignUp"    onClick={this.handleDialogueBoxVisiblity}>
                                                    login/SignUp
                                                </Button>
                                        </div>:
                                        <div className="loginPopUp" >
                                            <p className="logoutTitle">Hello {localStorage.getItem('fullName')},</p>
                                            <hr/>
                                            <Typography style={{marginTop: "9px", display: "flex"}} color="textSecondary"
                                                gutterBottom><Link to="/myprofile"><PersonIcon
                                                style={{marginRight: "5px"}}/></Link><Link to="/myprofile">My Profile</Link>
                                            </Typography>
                                            <Typography style={{marginTop: "9px", display: "flex"}} color="textSecondary"
                                                gutterBottom><Link to="/myorder"><CardGiftcardIcon
                                                style={{marginRight: "6px"}}/></Link><Link to="/myorder">My Orders</Link>
                                            </Typography>
                                            <Typography style={{marginTop: "9px", display: "flex"}} color="textSecondary"
                                                    gutterBottom><Link to="/whishlist"><FavoriteIcon
                                                    style={{marginRight: "6px"}}/></Link><Link to="/whishlist">My Wishlist</Link>
                                            </Typography>
                                            <Button id="logout" onClick={this.handleLogoutBoxVisibility}>
                                                Logout
                                            </Button>
                                        </div>
                                        }
                                    </Popover>
                                </div>
                            )}
                        </PopupState>
                </div>
                                        
                <div className="shoppingCartDiv">
                        <IconButton id="profileIcon" aria-label="show 4 new mails" color="inherit" style={{right:'300%'}}>
                            <Badge className="badge-carticon" badgeContent={this.state.counter} style={{color:"white",border: "2px solid rgb(145, 10, 10)"}}>
                                    <Link style={{color: 'white'}} to={`/cart`}><ShoppingCartOutlinedIcon className="carticon"/></Link>
                            </Badge>
                        </IconButton>
                </div>

            </Toolbar>
        </AppBar>
    );
}
    
}