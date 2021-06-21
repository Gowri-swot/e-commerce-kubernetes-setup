import reducers from './reducers';
import './App.css';
import {Provider} from 'react-redux';
import {createStore } from 'redux';
import MenuBar from './components/menubar'
import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'

export const store = createStore(reducers);

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <MenuBar/>
          <Login/>
          <Register/>
            <BrowserRouter>
                <Switch>
                  
                </Switch>
            </BrowserRouter>
        </Provider>
    );
  }

}

export default App;

