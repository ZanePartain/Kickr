import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect,Switch} from 'react-router-dom'
import Route from 'react-router-dom/Route'; //this will give us a route tag
import Register from './components/Welcome-Form/Register';
import Login from './components/Welcome-Form/Login';
import User from './components/Dashboard/User';
import Home from './components/Dashboard/Home';
import Inbox from './components/Dashboard/Inbox';
import Leaderboard from './components/Leaderboard/Leaderboard';

import { connect } from 'react-redux'


class App extends Component {

  state={
    user: ''
  }

  onSubmit = (fields) =>{
    console.log("App.js Submit:", fields);
    const curState = fields;
    this.setState({user: curState});
    this.props.handleUsername(this.state.user);
    this.props.handleToggleLogin();
  }


  render() {
    console.log("App render")
    return (
      <Router>
        
        <div className="App">
       
            <Switch>
                    <Route path="/" exact strict render={
                      () => (
                        !this.props.login ? <Login onSubmit={this.onSubmit.bind(this)}/> : (<Redirect to="/home"/>) /*this will allow welcome to pass its properites upstream*/
                      )}/> 
                    <Route path="/register" exact strict render={
                      () => (
                        !this.props.login ? <Register onSubmit={this.onSubmit.bind(this)}/> : (<Redirect to="/home"/>) //*this will allow welcome to pass its properites upstream*/
                      )}/> 

                    {/*the routes below are for the user views (when login: true)*/}
                        
                    <Route exact path="/profile" render={
                      () => (
                        this.props.login ? (<User/>) : (<Redirect to="/"/>) //pass entire user obj into User (profile)
                      )}/>
                    <Route exact path="/home" render={
                      () => (
                        this.props.login ? (<Home/>) : (<Redirect to="/"/>) //pass entire user obj into User (profile)
                      )}/>
                    <Route exact path="/inbox" render={
                      () => (
                        this.props.login ? (<Inbox user={this.state.fields}/>) : (<Redirect to="/"/>) //pass entire user obj into User (profile)
                      )}/>
                    <Route exact path="/leaderboard" render={
                      () => (
                        this.props.login ? (<Leaderboard user={this.state.fields}/>) : (<Redirect to="/"/>) //pass entire user obj into User (profile)
                      )}/>
            </Switch>
            
           {/*} <div className="hi">
              {/**display current login status on every page 
              <div> Login: <span>{JSON.stringify(this.props.login)}</span></div>
              {/*<div> Username: <span>{JSON.stringify(this.props.user)}</span></div>*/}
            

        </div>
       
      </Router>
    );
    
  }
}

const mapStateToProps = (state) =>{
  return{
    login: state.login,
    user: state.user
  }
};
const mapDispatchToProps = (dispatch) =>{
  return{
    handleToggleLogin: () => dispatch({type: 'TOGGLE_LOGIN'}),
    handleUsername: (user) => dispatch({type: 'USERNAME', val: user})
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(App);
