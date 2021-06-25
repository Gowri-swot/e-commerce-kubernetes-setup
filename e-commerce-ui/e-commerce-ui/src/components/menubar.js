import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import { Remove_user_after_logout } from '../actions';
import { Show_register_page } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuBar = (props) => {
  const classes = useStyles();

  function handleLogout() {
    props.dispatch(Remove_user_after_logout())
  }

  function handleRegister() {
    props.dispatch(Show_register_page())
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            E-Commerce-Website(Kubernetes)
          </Typography>
          { props.user_details.user.email != "" ? <Button onClick={handleLogout} color="inherit">Logout</Button> : null}

          <Divider style={{background: "white"}} orientation="vertical" flexItem />
          { props.user_details.user.email == "" ? <Button onClick={handleRegister} color="inherit">Register</Button> : null }

        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state, props) =>  {
  const user_details = state.user
  return { 
    user_details
  }
};

export default connect(mapStateToProps, null)(MenuBar);