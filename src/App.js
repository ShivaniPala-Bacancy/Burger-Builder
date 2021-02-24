import './App.css';
import asyncComponent from './hoc/asyncComponent'
import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux';
import * as actions from '../src/store/actions/index'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  
  render(){
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes= (
        <Switch>
            <Route path="/orders" exact component={asyncOrders} />
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/logout" component={Logout} />
            <Route path='/auth' component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
      )
    }
    return (
        <div className="App">
          <Layout>
            {routes}
          </Layout>
        </div>
    );
  }
 
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup : () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
