import React, {Component} from 'react'
import{NavLink} from 'react-router-dom'
import './NavBar.css'
// need to controlf flow of browser history


class NavBar extends Component{
    constructor(props){
        super(props);
        this.state={
            //maybe create local storage for each individual attribute 
            // from this.props.user
        }
    }

    handleLogout = (e) =>{
        e.preventDefault();
        this.props.logout();
    };
    render(){
        return(
            <div>
                <header className="dashHead">
                    <h1>Kickr Nav Bar</h1>
                    <div className="navBar">
                        <NavLink className="tab" to="/profile">profile</NavLink>
                        <NavLink className="tab" exact to="/home">home</NavLink>
                        <NavLink className="tab" exact to="/inbox">inbox</NavLink>
                        <NavLink className="tab" exact to="/leaderboard">Leaderboard</NavLink>
                        <NavLink className="tab" to="/" onClick={this.handleLogout.bind(this)}>log out</NavLink>
                    </div>
                </header>
            </div> 
        );
    }
}

export default (NavBar);