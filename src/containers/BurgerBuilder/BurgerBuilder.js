import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{
    state= {
        purchasing: false,
    }

    componentDidMount(){
     this.props.onInitIngredients()   
    }

    updatePurchaseState(ingredients){
        let sum=0;
        const arr= Object.keys(ingredients)
        .map(igKey =>{ 
            sum =sum + ingredients[igKey];
        
    })
    return sum > 0;
    
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler=() =>{
        this.props.onInitPurchase();
        this.setState({purchasing: false});
    }


    render(){
        const disabledInfo= {
            ...this.props.ingredients
        }
        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        let orderSummary= null;
        

        let burger= this.props.error ? <p>Sorry.....Ingredients cannot be loaded!!!</p> : <Spinner />;
        if(this.props.ingredients){
            burger= 
            <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls 
                ingredientAdded={(ingredientName) => this.props.onAddIngredient(ingredientName)} 
                ingredientRemoved={(ingredientName) => this.props.onRemoveIngredient(ingredientName)}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchasable={this.updatePurchaseState(this.props.ingredients)}
                ordered={this.purchaseHandler}
                />

            </Aux>;
       orderSummary = 
       <OrderSummary 
            ingredients={this.props.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            sum={this.props.totalPrice}>
        </OrderSummary>;
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
   
       
        }
         return(
            <Aux>
                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
               {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: (ingredientName) => dispatch(actions.add_ingredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.remove_ingredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.init_ingredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));