import React from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ErrorBoundary from './ErrorBoundary'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './login.css';
import {connect} from 'react-redux';
import { Add_user_after_login } from "../actions";
import axios from 'axios'

const Login = (props) => {

    return (
      <ErrorBoundary>
      <Card className="card-body" >
      <CardContent>
        <Typography className="title" gutterBottom>
          Login
        </Typography>
        <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = '*Email Id is Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = '*Invalid email address';
         } if (!values.password) {
          errors.password = '*Password is Required';
        }
         return errors;
       }}
       onSubmit={values => {
          const headers = { 
          'Content-Type': 'application/json'
          };
      axios.post(`http://localhost:7070/auth/login`, values, { headers })
        .then(response => {
          if(response.statusText == "OK") {
            props.dispatch(Add_user_after_login({email:values.email, token: response.data.token}));
          } else {
            throw new Error("Something went wrong")
          }})
          
      }}>
        <Form className="formClass">
        <Field id="email" className="col-md-12 formField" label="Email"
          name="email"
          type="text"
          placeholder="Enter your email"
        />
        <ErrorMessage className="errorField" name="email" component="div" />
        <Field id="password" className="col-md-12 formField" label="Password" 
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <ErrorMessage className="errorField" name="password" component="div" />
        <div className="row">
        <Button className="buttonClass" variant="contained" color="primary" type="submit">Login</Button>
        </div>
        
      </Form>
     </Formik>
      </CardContent>
    </Card>
    </ErrorBoundary>
    );
  
}
export default connect()(Login);