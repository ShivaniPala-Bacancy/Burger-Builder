import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/spinner/spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index'

const ContactData =props => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [orderForm, setOrderForm]=  useState({
        
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP CODE'
                    },
                    value: '',
                    validation:{
                        required: true,
                        minLength: 6,
                        maxLength: 6,
                    }, valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation:{
                        required: true,
                    }, valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'},
                        ]
                    },
                    value: 'fastest',
                    valid: true,
                    touched: false
                }
        })
    
    const orderHandler=(event) =>{
        event.preventDefault();
        const formData={}
        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        };
        const order= {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId,
        }
        props.onOrderBurger(order, props.token);
    }
    const checkValidity = (value, rules) => {
        
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minLength){
                isValid= value.length >= rules.minLength && isValid;       
            }
            if(rules.maxLength){
                isValid= value.length <= rules.maxLength && isValid;        
            }
        }
        return isValid;
    }
    
    const inputChangedHandler= (event, inputIdentifier) => {
        const updatedOrderForm= {
            ...orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value= event.target.value;
        updatedFormElement.touched= true
        updatedFormElement.valid= checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid)
    }
    
        const formElementsArray=[];
        for(let key in orderForm){
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }
        let form= (
            <form onSubmit={orderHandler}>
                    {formElementsArray.map(formElement =>(
                        <Input 
                        key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value} 
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            changed={(event) => inputChangedHandler(event, formElement.id)}
                            invalid={!formElement.config.valid} />
                    ))}
                    <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
                </form>
        );
        if(props.loading){
            form= <Spinner />
        }
        return(
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    
};


const mapStateToProps= state => {
    return{
        totalPrice: state.burgerBuilder.totalPrice,
        ingredients: state.burgerBuilder.ingredients,
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
     onOrderBurger: (orderData, token) => dispatch(orderActions.purchase_burger(orderData, token))   
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));