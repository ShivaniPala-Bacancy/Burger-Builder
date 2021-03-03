import './App.css';
import React, { useEffect , Suspense} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux';
import * as actions from '../src/store/actions/index'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = (props) => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup])
  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )
  if(props.isAuthenticated){
    routes= (
      <Switch>
          <Route path="/orders" exact render={(props) => <Orders  {...props} />} />
          <Route path="/checkout" render={(props) => <Checkout  {...props} />} />
          <Route path="/logout" component={Logout} />
          <Route path='/auth' render={(props) => <Auth  {...props} />} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
    )
  }
  return (
      <div className="App">
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </div>
  );
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

export default withRouter(
  connect(
    mapStateToProps, mapDispatchToProps
    )(App));
