import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const add_ingredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const remove_ingredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const fetch_ingredients_failed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const set_ingredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const init_ingredients =() => {
    return dispatch => {
        axios.get('https://react-my-burger-d535c-default-rtdb.firebaseio.com/ingredients.json')
        .then(res =>{
            dispatch(set_ingredients(res.data))
        })
        .catch(error =>{
            dispatch(fetch_ingredients_failed());
        })
    }
}