import React, { Component } from 'react';   
import './Register.css';
import axios from 'axios';
import KickrHeader from './Header';
import {NavLink} from 'react-router-dom';

class Register extends Component {
    constructor(props){
        super(props);
        console.log("Register constructor")
        this.state={
            email: '',
            first_name: '',
            gender: '',
            last_name: '',
            password: '',
            phone_num: '',
            username: '', 
            //needsRender: false,
        }
    }

    componentWillMount() {
        console.log('Register componentdWillMount');
    }
 
    //handleChange will change the state of first_name as user types in the input
    handleChange = (e) =>{
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
        if ( e.target.name === "userType"){
            this.setState({needsRender: true});
        }
        console.log([e.target.name] +" " + e.target.value);
    }

    //onSubmit(): makes POST request with state fields (to create an account)
    //    if it is successful it call props.onSubmit(userData) 
    //    if it fails it will alert the user that their username is already taken
    onSubmit = (e) =>{
        e.preventDefault();
        console.log("Register.js has:", this.state)
        const url = 'http://kickr.herokuapp.com/api/signup'
        const user = this.state;
        axios.post(url,{user})
        .then((res) => {
            console.log(res.data);
            //successful POST
            if( res.data["status"] !== 0){
              this.props.onSubmit(res.data["user"]);
            }
            //unsuccessful POST
            else{
                window.alert("Username already taken");
            }
        })
        .catch((error) =>{
            console.log(error);
        });  
    }

    onClick = (e) =>{
       this.setState({visible: !this.state.visible});
    }

    render() {
        console.log("Register render");
        return(
                <div className="Register">
                    <KickrHeader/>
                    <div className="myForm">
                        <div>
                            {/*below is the form a user would see if they were registering*/} 
                            <form>
                                <input 
                                    className="inputBox"
                                    name="first_name"
                                    type="text"
                                    placeholder="First name" 
                                    value={this.state.first_name} 
                                    onChange={this.handleChange.bind(this)}
                                />
                                <input
                                    name="last_name" 
                                    type="text"
                                    placeholder="Last name"
                                    value={this.state.last_name} 
                                    onChange={this.handleChange.bind(this)}
                                />
                                <input
                                    name="username" 
                                    type="text"
                                    placeholder="username"
                                    value={this.state.username} 
                                    onChange={this.handleChange.bind(this)}
                                />
                                <input
                                    name="phone_num" 
                                    type="text"
                                    placeholder="phone number"
                                    value={this.state.phone_num} 
                                    onChange={this.handleChange.bind(this)}
                                />
                                <input
                                    name="email" 
                                    type="text"
                                    placeholder="email"
                                    value={this.state.email} 
                                    onChange={this.handleChange.bind(this)}
                                />
                              
                                <input
                                    name="password" 
                                    type="password"
                                    placeholder="password"
                                    value={this.state.password} 
                                    onChange={this.handleChange.bind(this)}
                                />

                                <button className="signUp" onClick={this.onSubmit.bind(this)}>Sign up</button> 
                                <div className="cancelCreate">
                                    <NavLink to="/" style={{color:'rgb(0, 255, 0)'}}>cancel</NavLink>  {/**link back to Login */}                        
                                </div>
                            </form>
                        </div>
                    </div>{/**'/myForm */}
                </div>/**'/Register */
        );
    }
}

export default Register;