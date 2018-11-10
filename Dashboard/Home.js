import React, { Component } from 'react';  
import './Home.css';
import KickrNavBar from './NavBar'
import { connect } from 'react-redux'

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            //maybe create local storage for each individual attribute 
            // from this.props.user
        }
    }
    //onClick of button 'change state' it will trigger changeState
    //     prop.name: "Edgar"
    // note: only render will be called again
    changeState(){
        this.setState({name:"Edgar"})
        this.setState({age:"20"})
    }

    handleLogout(){
        this.props.handleToggleLogin();
    }

    render() {
        console.log("Home render")
        
        return(
            <div>
                
                <KickrNavBar logout={this.handleLogout.bind(this)}/>
                
                <div className="Home">   

                    {/* User is for each individual user profile*/}
                    <h2>Kickr Home<br></br></h2>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Home);