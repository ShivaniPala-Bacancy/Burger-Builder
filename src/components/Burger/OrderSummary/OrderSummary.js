import React, { Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'
import {Link} from 'react-router-dom';
const  OrderSummary = props => {
    
    
        const queryParams= [];
        for(let i in props.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(props.ingredients[i]))
        }
        queryParams.push("total=" + props.sum.toFixed(2));
       const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
                </li>
    });
        return (
            
    <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price: {props.sum.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Success" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Link 
        to={{
            pathname: "/checkout",
        }}>
            <Button btnType="Danger" >CONTINUE</Button></Link>
    </Auxiliary>

    )
}

export default OrderSummary;