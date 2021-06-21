import React from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    const { email, password } = this.state;
    return (
      
      <Card className="card-body" >
      <CardContent>
        <Typography className="title" gutterBottom>
          Login
        </Typography>
        <form className="formClass" onSubmit={this.handleSubmit}>
        <TextField id="email" className="col-md-12 formField" label="Email"
          name="email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={this.handleChange}
        />
        <TextField id="password" className="col-md-12 formField" label="Password" 
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={this.handleChange}
        />
        <div className="row">
        <Button className="buttonClass" variant="contained" color="primary" type="submit">Login</Button>
        </div>
        
      </form>
      </CardContent>
    </Card>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log("Submitting");
    console.log(this.state);
  };
}
