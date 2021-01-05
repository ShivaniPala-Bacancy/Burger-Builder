import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Link} from 'react-router-dom'; 
import ContactData from './ContactData/ContactData'
class Checkout extends Component{
    state={
        ingredients: {},
        totalPrice:0
    }
    componentDidMount(){
        this.parseQueryParams();
    }
    parseQueryParams(){
        const query = new URLSearchParams(this.props.location.search);
        let queryIngredients={};
        let price =0;
        for(let param of query.entries()){
            if(param[0]==='total'){
                price= param[1];
            }
            else{
                console.log("ingrediebts are: " + param);
                queryIngredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: queryIngredients, totalPrice: price})
        console.log(queryIngredients);
    }
    checkoutCancelledHandler= () =>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler= () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.state.ingredients}/>
                <Route 
                path={this.props.match.url + "/contact-data"} 
                render={(props)=> (<ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} {...props}/>)}
                 />
            </div>
        )
    }
}

export default Checkout;