import React, {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.module.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/spinner/spinner'
import {Redirect} from 'react-router-dom'
class Auth extends Component{
    state={
        controls: {
            email: {
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
        },
        isSignUp: true
    }
    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.onSetRedirectPath();
        }
    }
    checkValidity(value, rules){
        
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
    inputChangedHandler= (event, controlName) => {
        const updatedControls= {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }
    submitHandler =(event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    
    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return{
                isSignUp: !prevState.isSignUp
            }
        })
    }
    render(){
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid} />
                
            )
        })
        if(this.props.loading){
            form = <Spinner />
        }
        let errorMsg= null;
        if(this.props.error){
            errorMsg = (
                <p>
                    {this.props.error.message}
                </p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            <div className={styles.Auth}>
                {authRedirect}
                {errorMsg}
            <form>
                {form}
            <Button
                clicked={(event) => this.submitHandler(event)}
                btnType="Success">SUBMIT</Button>
            <Button
                clicked={(event) => this.switchAuthModeHandler(event)}
                btnType="Danger">Switch To  
                 {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
            </form>
            </div>
        )
    }
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