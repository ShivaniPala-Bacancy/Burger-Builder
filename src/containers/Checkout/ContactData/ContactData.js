import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/spinner/spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component{
    state={
        orderForm: {
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
        },
        formIsValid: false,
        loading: false
    }
    orderHandler=(event) =>{
        event.preventDefault();
        const formData={}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        };
        console.log(this.props.totalPrice)
        this.setState({loading: true})
        const order= {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData

        }
        axios.post('/orders.json' , order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });



    }
    checkValidity(value, rules){
        
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
    
    inputChangedHandler= (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm= {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value= event.target.value;
        updatedFormElement.touched= true
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    render(){
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form= (
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement =>(
                        <Input 
                        key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value} 
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            invalid={!formElement.config.valid} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form= <Spinner />
        }
        return(
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    } 
};

export default ContactData;