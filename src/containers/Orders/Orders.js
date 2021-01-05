import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component{
    state={
        orders: [],
        loading: true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res =>{
            const fetchedOrders =[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(err =>{
            this.setState({loading: false})
        })
    }
    render(){
        
        let orders= this.state.orders.map((order) => {
            return (
                <Order 
                    key={order.id} 
                    ingredients={order.ingredients} 
                    totalPrice={order.price} />
            )
        }
        
        )
        if(this.state.loading){
            orders= <Spinner />
        }
        return (
            <div>
                {console.log(this.state.orders)}
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);