import React, {useEffect} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../src/store/actions/index'
import { connect } from 'react-redux'

const Orders = props => {
    const {onFetchOrders} = props;
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders])
    
    
    let orders = <Spinner />;
    
    if(props.loading === false){
        orders = (
        props.orders.map((order) => {
            return (
                <Order 
                    key={order.id} 
                    ingredients={order.ingredients} 
                    totalPrice={order.price.toFixed(2)} />
            )
        })
        )
    }
    return (
        <div>
            {orders}
        </div>
    );
    
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetch_orders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));