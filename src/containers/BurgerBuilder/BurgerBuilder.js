import React , { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary';
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect, useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)
    const dispatch = useDispatch();
    const ingredients=  useSelector(state => {
        return state.burgerBuilder.ingredients
    });
    
    const totalPrice=  useSelector(state => {
        return state.burgerBuilder.totalPrice
    });
    
    const error=  useSelector(state => {
        return state.burgerBuilder.error
    });
    
    const isAuthenticated=  useSelector(state => {
        return state.burgerBuilder.isAuthenticated
    });
    const onAddIngredient= (ingredientName) => dispatch(actions.add_ingredient(ingredientName));
    const onRemoveIngredient= (ingredientName) => dispatch(actions.remove_ingredient(ingredientName));
    const onInitPurchase= () => dispatch(actions.purchaseInit());
    const onInitIngredients= useCallback(() => dispatch(actions.init_ingredients()), [dispatch]);
    const onSetAuthRedirection= (path) => dispatch(actions.setAuthRedirect(path));
    
    useEffect(() => {
        onInitIngredients();   
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        let sum=0;
        const arr= Object.keys(ingredients)
        .map(igKey =>{ 
            sum =sum + ingredients[igKey];
        
    })
    return sum > 0;
    
    }

    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing(true)
        }
        else{
            onSetAuthRedirection('/checkout');
            props.history.push("/auth");
        }
        
    }

    const purchaseCancelHandler=() =>{
        onInitPurchase();
        setPurchasing(false);
    }


    
        const disabledInfo= {
            ...ingredients
        }
        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        let orderSummary= null;
        

        let burger= error ? <p>Sorry.....Ingredients cannot be loaded!!!</p> : <Spinner />;
        if(ingredients){
            burger= 
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls 
                ingredientAdded={(ingredientName) => onAddIngredient(ingredientName)} 
                ingredientRemoved={(ingredientName) => onRemoveIngredient(ingredientName)}
                disabled={disabledInfo}
                price={totalPrice}
                isAuthenticated={isAuthenticated}
                purchasable={updatePurchaseState(ingredients)}
                ordered={purchaseHandler}
                />

            </Aux>;
       orderSummary = 
       <OrderSummary 
            ingredients={ingredients}
            purchaseCancelled={purchaseCancelHandler}
            sum={totalPrice}>
        </OrderSummary>;
        if(props.loading) {
            orderSummary = <Spinner />;
        }
   
       
        }
         return(
            <Aux>
                
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
               {burger}
            </Aux>
        );
    
}


export default (withErrorHandler(BurgerBuilder, axios));