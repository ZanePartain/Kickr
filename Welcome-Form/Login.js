import React, {Component} from 'react';
import KickrHeader from './Header';
import {NavLink} from 'react-router-dom';
import './Login.css';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: ''
        }
    }

    //onSubmit(): makes GET request to verify if the user account exists
        //  if it exists it will call props.onSubmit(userData)
        //  if it doesnt exist it will alert the user the account doesnt exist
    onSubmit = (e) =>{
        e.preventDefault()
        const url = 'http://kickr.herokuapp.com/api/'+ this.state.username;
        axios.get(url)
        .then((res) => {
            console.log("Login onSubmit:", res.data);
            //if successful response (account exists)
            if(res.data["status"] === 1){
                this.props.onSubmit(res.data["user"]) //pass user into props.ToggleLogin
            }
            else{
                window.alert('Invalid username or password.');
            }
        })
        .catch((error) => {
            console.log(error);
            window.alert('Invalid username or password.');
        });
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
        console.log([e.target.name] + " " + e.target.value);
    }

    render(){
        return(
            
            <div className="Login">
                <KickrHeader/>
                <form className="loginForm">
                        <input 
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange.bind(this)}
                        /> 
                        <input 
                            type="password"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange.bind(this)}
                        /> 
                        <div className="createLoginContainer">
                            <button className="login" onClick={this.onSubmit.bind(this)}>Log in</button>
                            <div className="createAccLink">
                                <NavLink to="/register" style={{color:'rgb(0, 255, 0)'}}>create account</NavLink>
                            </div>
                        </div>  
                </form>
            </div>
        
        );
    }
}


export default Login;