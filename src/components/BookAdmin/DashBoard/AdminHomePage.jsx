import React from 'react';
import '../../BookStoreHomePage/BookStoreHomePage.css'
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import SnackBar from "../../utils/SnakBar";
import Pagination from "@material-ui/lab/Pagination";
import Select from "@material-ui/core/Select";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Footer from "../../utils/FooterBar";
import NavigationBar from "../DashBoard/utils/AdminNavigationBar.jsx"
import BookService from "../../../services/BookStoreServices"
import noImage from "../../../Assets/noBooksfound.png"
import CustomCard from "../DashBoard/utils/AdminBookCustomCard.jsx"
import CustomerService from "../../../services/CustomerService"

const customerService = new CustomerService();
const bookServices = new BookService();
export default class AdminHomePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageNo: 1,
            dataLength: 0,
            tempLength: 0,
            temp: [],
            snackFlag: false,
            severity: "error",
            snackMessage: "",
            tempTwo: [],
            searchActivated: "",
            myFlag: true,
            searchText: "none",
            selectBoxValue: "none",
            name:"",
            userData:[],
            isLoading:true
        }
        this.searchBar = React.createRef();
    }

    getAllBooks =() => {
        bookServices.displayBook().then(response => {
            console.log("book get response",response);
            this.setState({
                data: response.data,
                temp: response.data,
                // isLoading : false
            })
            console.log("the state data of books ",this.state.data);
        }).catch((error) => {
            console.log(error);
        })

    }  
   
    getCount = () => {
        bookServices.getCount().then(response => {
            this.setState({
                dataLength: response.data,
                tempLength: response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    getUser = () =>{

        customerService.customerDetails().then(response=>{
            console.log("customer details are" )
            this.setState({
                name:response.data.fullName,
                userData:response.data
                
            })
        }).catch((error) =>{
            console.log(error)
        })
    }
    // LOW_TO_HIGH = () => {
    //     bookServices.lowToHigh().then(response => {
    //         this.setState({
    //             dataLength: response.data,
    //             tempLength: response.data
    //         })
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }


    componentDidMount() {
        let user = localStorage.getItem('Authorization')
        this.getAllBooks();
        this.getCount();
        if(user !== null){
            this.getUser();
        }
    }


    handlePageChange = (event, value) => {
        if (!this.state.myFlag) {
            this.state.pageNo = value
            this.getBooks()
        } else {
            this.state.pageNo = value
            this.searchAndFilter()
        }
    }


    getSearchText = (text) => {
        if (text.trim().length === 0) {
            this.getBooks()
            this.getCount()
            this.setState({
                searchText: "none"
            })
        } else {
            this.setState({
                searchText: text,
                myFlag: true,
                selectBoxValue:this.state.selectBoxValue="none"? "NEWEST_ARRIVALS":this.state.selectBoxValue
            }, () => this.searchAndFilter())
        }
    }

    displaySearchBook = (filteredData, errormessage, input, countData) => {
        if (filteredData.length === 0 && errormessage) {
            this.getBooks()
            this.getCount()
        }
        if (filteredData.length === 0 && !errormessage) {
            this.setState({
                dataLength: 0,
                data: this.state.tempTwo,
                snackFlag: true,
                snackMessage: `No books available with name ${input}`
            })
            setTimeout(() => {
                this.setState({
                    snackFlag: false
                })
            }, 3000);
        } else {
            this.setState({
                data: filteredData,
                dataLength: countData
            })
        }
    }
  

    handleChange = (event) => {
        if (event.target.value === "None") {
            this.setState({
                 selectBoxValue: "NEWEST_ARRIVALS",
            }, () => this.getAllBooks())
        } else if(event.target.value === "LOW_TO_HIGH"){
            this.setState({
                selectBoxValue: "LOW_TO_HIGH",
            }, () => this.highToLow())
        } else if(event.target.value ==="HIGH_TO_LOW"){
            this.setState({
                selectBoxValue:"HIGH_TO_LOW",
            },() => this.lowtoHigh())
        }else{
          this.setState({
            selectBoxValue:"NEWEST_ARRIVALS",
          } , () => this.newestLaunch())
        }
    }

    highToLow=(event) => {
        bookServices.HighToLow().then(response => {
            console.log(response);
            this.setState({
                data: response.data,
                temp: response.data,
                // isLoading : false
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    lowtoHigh=(event) =>{
        bookServices.lowToHigh().then(response => {
            console.log(response);
            this.setState({
                data: response.data,
                temp: response.data,
                // isLoading : false
            })
        }).catch((error) => {
            console.log(error);
        })

    }

    newestLaunch=(event) => {
        bookServices.NewestArrival().then(response => {
            console.log(response);
            this.setState({
                data: response.data,
                temp: response.data,
                // isLoading : false
            })
        }).catch((error) => {
            console.log(error);
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

        // let data = this.state.data;
        console.log("the check render",this.state.data);
        // console.log("in let variable ",data);

        return (
                <div>
                    <NavigationBar userData={this.state.userData} ref={this.searchBar} test={this.getSearchText} name={this.state.name}/>
                    <div className="maincarddiv">
                        <Container className="maincontain" id="maincontainer">
                            <div id="filter">
                                <h2>Books <p className="maincontain-p"> ({this.state.dataLength} items)</p></h2>
                                <ThemeProvider theme={theme}>
                                    <Select
                                        native
                                        className="select-filter"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                        >
                                        <option defaultValue value={"None"}>Sort by</option>
                                        <option value={"LOW_TO_HIGH"}>Price:Low to High</option>
                                        <option value={"HIGH_TO_LOW"}>Price:High to Low</option>
                                        <option value={"NEWEST_ARRIVALS"}> Newest Arrivals</option>
                                    </Select>
                                </ThemeProvider>
                            </div>

                            <Grid container spacing={4}>
                                
                            {this.state.data.length > 0 ? this.state.data.map((book, index) => {
                                     return <Grid key={book.id}  item xs={12} sm={6} md={4} lg={3}>
                                         
                                          <CustomCard key={book.id} cartReference={this.searchBar} book={book} index={index}/> 
                                    </Grid>
                                }):<div className="imagediv"><img className="booknotfound" src={noImage} alt="No Books Found"/></div>}
                            </Grid>
                            
                        </Container>
                    </div>

                    <Grid container className="page">
                        <Pagination showFirstButton showLastButton count={Math.ceil(this.state.dataLength / 8)}
                                    onChange={this.handlePageChange}/>
                    </Grid>
                    {this.state.snackFlag &&
                    <SnackBar message={this.state.snackMessage} severity={this.state.severity}/>
                    }
                    <Footer/>
                </div>
        );
    }
}