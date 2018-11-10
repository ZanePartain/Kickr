import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import KickrNavBar from './NavBar'
import { connect } from 'react-redux';

/** This info will most likely be accessible as a profile tab
 * on Home
 * Note: UserProfile is a child of Home (it has access to all Home props passed into it)
*/

class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            //maybe create local storage for each individual attribute 
            // from this.props.user
        }
    }

    componentWillMount(){
        console.log("User Profile componentWillMount:", this.props.user);
    }

    /*
    async componentDidMount(){
        //this is a GET request to user table 
        const url = "https://kickr.herokuapp.com/api/" + this.props.user["username"] //unique usernames
        const response = await fetch(url);
        const data = await response.json();
        this.setState({user: data["user"]});
        console.log(this.state.userInfo);
        //....and use them as props in Dashboard child components
    }*/
    
    handleLogout(){
        this.props.handleToggleLogin();
        //maybe erase or clear global user
    }

    render(){
        console.log("User Profile render")

        return(
            <div>
                
                <KickrNavBar logout={this.handleLogout.bind(this)}/>

                <div className="UserProfile">
                    <div>
                        <h2>Kickr User Profile</h2>
                        <br></br>
                        Username: {this.props.user["username"]}
                        <br></br>
                        First name: {this.props.user["first_name"]}
                        <br></br>
                        Last name: {this.props.user["last_name"]}
                        <br></br>
                        Email: {this.props.user["email"]}
                        <br></br>
                        Gender: {this.props.user["gender"]}
                        <br></br>
                        (link: edit profile)
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
      user: state.user,
      login: state.login
    }
  };
  const mapDispatchToProps = (dispatch) =>{
    return{
      handleToggleLogin: () => dispatch({type: 'TOGGLE_LOGIN'}),
      handleUsername: (user) => dispatch({type: 'USERNAME', val: user})
    }
  };
export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
