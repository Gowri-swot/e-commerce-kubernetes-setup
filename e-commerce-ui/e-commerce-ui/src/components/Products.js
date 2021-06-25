import { DataGrid } from '@material-ui/data-grid';
import Card from '@material-ui/core/Card';
import React , {useEffect, useState} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CardContent from '@material-ui/core/CardContent';
import { CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
import {connect} from 'react-redux';
import {Add_product, Order_product} from '../actions'

const Products = (props) => {
  console.log(props)
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([])

  useEffect(() => {
    loadProductData()
  }, [])
  
  function loadProductData() {
    axios.get(`http://localhost:8080/product`, {'headers' : {'Authorization' : 'Bearer '+props.user_details.user.token }}).then(res => {
      console.log(res)
      if(res.statusText == "OK") {
        props.dispatch(Add_product(res.data))
      } else {
        throw new Error("Something went Wrong")
      }
    })
  }

  function placeOrder() {
    console.log(selection)
    var data = {
      ids : selection
    }
    const headers = {
      'headers' : { 
      'Authorization': 'Bearer '+props.user_details.user.token,
      'Content-Type': 'application/json'
      }
    };
    axios.post(`http://localhost:8080/product/buy`, data, headers).then(res => {
      if(res.statusText !== "OK") {
        throw new Error("Something went Wrong")
      }
      setSelection([])
    })

  }
  const handleClose = (value) => {
    setOpen(false);
  }
    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        {
          field: 'name',
          headerName: 'Book Name',
          width: 150,
        },
        {
          field: 'price',
          headerName: 'Amount',
          type: 'number',
          width: 150,
        },
        {
          field: 'description',
          headerName: 'Description',
          width: 200,
        },
      ];
      
     
    return (
    <div>
    <Card className="displayCard">
        <Button onClick={() => setOpen(true)} variant="contained" color="secondary" >Add Product</Button>
        <CardContent> 
     <DataGrid
      rows={props.product_details.product_list}
      columns={columns}
      pageSize={5}
      checkboxSelection
      disableSelectionOnClick
      selectionModel={selection}
      onSelectionModelChange={(newSelection) => {
        setSelection(newSelection.selectionModel);
    }}
    /> 
<CardActions style={{float:"right"}}>
<Button onClick={placeOrder} variant="contained" color="secondary" type="submit">Order</Button>
  
</CardActions>
   </CardContent>
    </Card>
    <Dialog style={{ minWidth: '600px ! important', overflowX: 'hidden'}} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle>Add a product to store</DialogTitle>
          <Formik 
          initialValues={{ name: '', price: 0, description: '' }}
          validate={values => {
            const errors = {};
            if (!values.description) {
              errors.description = '*Description is Required';
            } if (values.price == 0) {
              errors.price = '*Price cannot be zero or empty';
            } if (!values.name) {
              errors.name = '*User Name is Required';
            } if( values.price < 0 && values.price > 1000) {
                errors.price = "* Min value is 1 and Maximum is 1000"
            }
            return errors;
          }}
          onSubmit={values => {
            const headers = { 
            'Authorization': 'Bearer '+props.user_details.user.token,
            'Content-Type': 'application/json'
            };
        axios.post(`http://localhost:8080/product/create`, values, { headers })
          .then(response => {
            if(response.statusText == "OK") {
              handleClose();
              props.dispatch(Add_product(values));
            } else {
              throw new Error("Something went wrong")
            }})
          }}>
            
          <Form className="formClass">
          <Field id="name" className="col-md-12 textField" label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
            <ErrorMessage className="errorField" name="name" component="div" />
          <Field id="price" className="col-md-12 textField" label="Price"
            name="price"
            type="number"
            placeholder="Amount ($)"
          />
            <ErrorMessage className="errorField" name="price" component="div" />
          <Field id="description" className="col-md-12 textField" label="Description" 
            name="description"
            type="text"
            placeholder="Short Description...."
          />
            <ErrorMessage className="errorField" name="description" component="div" />
          <div className="row">
          <Button className="buttonClass" variant="contained" color="secondary" type="submit">Add</Button>
          </div>
          
        </Form>
        </Formik>
    </Dialog> 
   
    </div>    
    );
}
const mapStateToProps = (state, props) =>  {
  const user_details = state.user
  const product_details = state.product

  return {
      user_details,
      product_details
  }
};

export default connect(mapStateToProps)(Products);

