import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../src/store/actions/index'
import { connect } from 'react-redux'

class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrders();
    }
    render(){
        
        let orders = <Spinner />;
        
        if(this.props.loading == false){
            orders = (
            this.props.orders.map((order) => {
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
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => dispatch(actions.fetch_orders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));