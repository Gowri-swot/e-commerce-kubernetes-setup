import reducers from './reducers';
import './App.css';
import {Provider} from 'react-redux';
import {createStore } from 'redux';
import MenuBar from './components/menubar'
import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import Products from './components/Products'
import Home from './pages/Home'

export const store = createStore(reducers);

const App = () => {

    return (
        <Provider store={store}>
          <MenuBar/>
            <BrowserRouter>
                  <Route exact path={''} component={Home}></Route>
                  <Route exact path={'/login'} component={Login}></Route>
                  <Route exact path={'/register'} component={Register}></Route>
                  <Route exact path={'/products'} component={Products}></Route>
            </BrowserRouter>  
        </Provider>
    );
  }


export default App;

