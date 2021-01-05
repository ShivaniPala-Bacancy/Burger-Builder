import './App.css';
import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import {Route, Link} from 'react-router-dom';
import Orders from './containers/Orders/Orders'

class App extends Component {
  
  render(){
    return (
        <div className="App">
          <Layout>
            <Route path="/orders" 
            // render={()=> <h1>order</h1>} />
            component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Layout>
        </div>
    );
  }
 
}

export default App;
