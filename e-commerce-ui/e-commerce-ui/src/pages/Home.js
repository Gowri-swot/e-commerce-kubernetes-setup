import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
    function loadPage() {
        if((props.user_details.user.email == "" || props.user_details.isRegistered) && !props.user_details.showRegisterPage) {
          return(<Redirect to="/login" />)
      } else if(props.user_details.user.email != "") {
          return (<Redirect to='/products'/>)
      } else if(props.user_details.showRegisterPage && props.user_details.user.email == "") {
          return(<Redirect to="/register"/>)
      }
    }

    return(
        <div>
            {loadPage()}
        </div>
        
    );
}

const mapStateToProps = (state, props) =>  {
    const user_details = state.user
    return {
        user_details
    }
};

export default connect(mapStateToProps, null)(Home);