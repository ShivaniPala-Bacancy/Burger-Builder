import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state= {

    //     }
    // }
    state= {
        ingredients: null,
         totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-d535c-default-rtdb.firebaseio.com/ingredients.json')
        .then(res =>{
            this.setState({ingredients: res.data});
            this.updatePurchaseState(res.data);
        })
        .catch(error =>{
            this.setState({error: true})
        })
    }

    updatePurchaseState(ingredients){
        let sum=0;
        const arr= Object.keys(ingredients)
        .map(igKey =>{ 
            sum =sum + ingredients[igKey];
            console.log("sum is: " + sum)
        
    })
    if(sum > 0){
        this.setState({purchasable: true})
    }
    else{
        const setF= false
        this.setState({purchasable: false})

    }

    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    addIngredientHandler =(type) =>{
        console.log("my type is " + type)
        const count = this.state.ingredients[type] + 1;
        const updatedIngredients= {
            ...this.state.ingredients
        };
        updatedIngredients[type]= count;

        const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: priceAddition});
        this.updatePurchaseState(updatedIngredients);

    }
    
    removeIngredientHandler =(type) =>{
        console.log("my type is " + type)
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const count= oldCount -1;
        const updatedIngredients= {
            ...this.state.ingredients
        };
        updatedIngredients[type]= count;

        const priceAddition = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: priceAddition});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseCancelHandler=() =>{
        this.setState({purchasing: false});
    }

    purchaseContinureHandler=() =>{
        // alert("you continue!!!!1")
        this.props.history.push("/checkout");
        // this.setState({loading: true})
        // const order= {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'shivani pala',
        //         address: {
        //             street: '2',
        //             zipcode: '361005',
        //             country: 'India'
        //         },
        //         email: 'shivani@gmail.com',

        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json' , order)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({loading: false, purchasing: false});
        //     });

    }

    render(){
        const disabledInfo= {
            ...this.state.ingredients
        }
        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        let orderSummary= null;
        

        let burger= this.state.error ? <p>Sorry.....Ingredients cannot be loaded!!!</p> : <Spinner />;
        if(this.state.ingredients){
            burger= 
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                />

            </Aux>;
       orderSummary = 
       <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinureHandler}
            sum={this.state.totalPrice}>
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

export default withErrorHandler(BurgerBuilder, axios);