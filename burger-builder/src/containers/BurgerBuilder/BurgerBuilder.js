import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/Ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {
    state={
        ingredients:null,
        totalPrice: 4,
        purchaseable:false,
        purchasing :false,
        loading: false,
        error:false
    }

    componentDidMount(){
        axios.get('https://burger-builder-b435e.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data})
        }).catch(error=>{
            this.setState({error:true})
        });
    }

     purchaseHandler=()=>{
         this.setState({purchasing:true});
     }

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients).map(igkey=>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;            
        },0);
        this.setState({purchaseable:sum>0});

    }

    addIngredietnHandler=(type)=>{

        const oldCount = this.state.ingredients[type];
        const updatedCoount = oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCoount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredietnHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0)
        {
            return;
        }
        const updatedCoount = oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCoount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinue=()=>{

        this.setState({loading:true});
        const order ={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
              
                name:'himanshu',
                address:'dsffeseff'
            },
            email:'dscsdcs'

        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false,purchasing: false});
            console.log(response)})
        .catch(error=>
            {
                this.setState({loading:false,purchasing: false});
                        });
      //  alert("you continue");


    }

    render() {
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key]<=0

        }
        let orderSummary = null;
       
       

        let burger = this.state.error?<p>can ot be loaded</p>:<Spinner/>
        if(this.state.ingredients)
        {
         burger = (
            <Aux>
               <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientsAdded={this.addIngredietnHandler}
                ingredientsRemoved={this.removeIngredietnHandler}
                disabled={disabledInfo}
                purchaseable={this.state.purchaseable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}
                />
            </Aux>
        );
        orderSummary =  <OrderSummary ingredients = {this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler} 
        purchaseContinue={this.purchaseContinue}
        price={this.state.totalPrice}
        />;

        }
        if(this.state.loading){
            orderSummary=<Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                 {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
    
}

export default withErrorHandler(BurgerBuilder,axios);
