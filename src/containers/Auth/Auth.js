import React, {Component, useState, useEffect} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.module.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/spinner/spinner'
import {Redirect} from 'react-router-dom'
const Auth = props => {
    const [controls, setControls]= useState({email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                }, 
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                }, 
                valid: false,
                touched: false
            },
        });
        const [isSignUp, setIsSignUp] = useState(true);
    const {building, authRedirectPath, onSetRedirectPath}= props;
    useEffect(() => {
        if(!building && authRedirectPath !== '/'){
            onSetRedirectPath();
        }
    }, [building, onSetRedirectPath, authRedirectPath])
    const checkValidity = (value, rules) => {
        
        let isValid = true;
        if(rules){
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid= pattern.test(value) && isValid


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
    const inputChangedHandler= (event, controlName) => {
        const updatedControls= {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        }
        setControls(updatedControls);
    }
    const submitHandler =(event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }
    
    const switchAuthModeHandler = (event) => {
        event.preventDefault();
        setIsSignUp(!isSignUp)
    }
    
        const formElementsArray=[];
        for(let key in controls){
            formElementsArray.push({
                id: key,
                config: controls[key]
            })
        }
        let form = formElementsArray.map(formElement => {
            
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value} 
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid} />
                
            )
        })
        if(props.loading){
            form = <Spinner />
        }
        let errorMsg= null;
        if(props.error){
            errorMsg = (
                <p>
                    {props.error.message}
                </p>
            )
        }
        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect = <Redirect to={props.authRedirectPath} />
        }
        return(
            <div className={styles.Auth}>
                {authRedirect}
                {errorMsg}
            <form>
                {form}
            <Button
                clicked={(event) => submitHandler(event)}
                btnType="Success">SUBMIT</Button>
            <Button
                clicked={(event) => switchAuthModeHandler(event)}
                btnType="Danger">Switch To  
                 {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
            </form>
            </div>
        )
    
}
const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirect('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);