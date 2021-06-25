import React from "react";
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import './login.css'
import axios from 'axios';
import { Registered_User } from "../actions";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Register = (props) => {
    return (
        <Card className="card-body" >
        <CardContent>
          <Typography className="title" gutterBottom>
            Register
          </Typography>
          <Formik 
          initialValues={{ email: '', password: '',name: '' }}
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
            } if (!values.name) {
              errors.name = '*User Name is Required';
            }
            return errors;
          }}
          onSubmit={values => {
            const headers = { 
            'Content-Type': 'application/json'
            };
        axios.post(`http://localhost:7070/auth/register`, values, { headers })
          .then(response => {
            if(response.statusText == "OK") {
             props.dispatch(Registered_User(true));
            } else {
              throw new Error("Something went wrong")
            }})
          }}>
            
          <Form className="formClass">
          <Field id="name" className="col-md-12 formField" label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
            <ErrorMessage className="errorField" name="name" component="div" />
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
          <Button className="buttonClass" variant="contained" color="primary" type="submit">Register</Button>
          </div>
          
        </Form>
        </Formik>
        </CardContent>
      </Card>
    );
  
}
export default connect()(Register);