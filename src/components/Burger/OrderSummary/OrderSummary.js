import React, { Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'
import {Link} from 'react-router-dom';
class OrderSummary extends Component{
    
    render() {
        const queryParams= [];
        for(let i in this.props.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i]))
        }
        queryParams.push("total=" + this.props.sum.toFixed(2));
        const queryString = queryParams.join('&');
       const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
        return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>
    });
        return (
            
    <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.sum.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Success" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Link 
        to={{
            pathname: "/checkout",
            // search:  '?' + queryString
        }}>
            <Button btnType="Danger" >CONTINUE</Button></Link>
    </Auxiliary>

    )
    }
}

export default OrderSummary;