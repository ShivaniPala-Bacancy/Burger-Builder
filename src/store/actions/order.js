import * as actionTypes from './actionTypes'
import axios from './../../axios-orders'

export const purchase_burger_success = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchase_burger_failed =(error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchase_burger  = (orderData) => {
    return dispatch => {
        dispatch(purchase_burger_start());
        axios.post('/orders.json' , orderData)
            .then(response => {
                dispatch(purchase_burger_success(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchase_burger_failed(error));
            });

    }
}

export const purchase_burger_start = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit =() => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetch_orders_start = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetch_orders_success = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetch_orders_fail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetch_orders = () => {
    return dispatch => {
        dispatch(fetch_orders_start());
        axios.get('/orders.json')
        .then(res =>{
            const fetchedOrders =[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetch_orders_success(fetchedOrders))
        })
        .catch(err =>{
            dispatch(fetch_orders_fail(err))
        })
    }
}