import React, {Component} from 'react';
import KickrNavBar from './NavBar';
import { connect } from 'react-redux';
/** This info will most likely be accessible as a Message tab
 * on Home
*/
class Inbox extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

        
    handleLogout(){
        this.props.handleToggleLogin();
        //maybe erase or clear global user
    }

    render(){
        return(
            <div> 
                <KickrNavBar logout={this.handleLogout.bind(this)}/>
                <h2>Kickr Inbox</h2>
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
export default connect(mapStateToProps,mapDispatchToProps)(Inbox);
