import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/Ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state={
        purchasing :false,
        loading: false,
        error:false
    }

    componentDidMount(){
        // axios.get('https://burger-builder-b435e.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     this.setState({ingredients:response.data})
        // }).catch(error=>{
        //     this.setState({error:true})
        // });
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
        //this.setState({purchaseable:sum>0});
        return sum>0
    }

    // addIngredietnHandler=(type)=>{

    //     const oldCount = this.state.ingredients[type];
    //     const updatedCoount = oldCount+1;
    //     const updatedIngredients={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCoount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice+priceAddition;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredietnHandler=(type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount<=0)
    //     {
    //         return;
    //     }
    //     const updatedCoount = oldCount-1;
    //     const updatedIngredients={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCoount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice-priceDeduction;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // purchaseCancelHandler=()=>{
    //     this.setState({purchasing:false});
    // }

    purchaseContinue=()=>{

    //     this.setState({loading:true});
    //     const order ={
    //         ingredients:this.state.ingredients,
    //         price:this.state.totalPrice,
    //         customer:{
              
    //             name:'himanshu',
    //             address:'dsffeseff'
    //         },
    //         email:'dscsdcs'

    //     }
    //     axios.post('/orders.json',order)
    //     .then(response=>{
    //         this.setState({loading:false,purchasing: false});
    //         console.log(response)})
    //     .catch(error=>
    //         {
    //             this.setState({loading:false,purchasing: false});
    //                     });
    //   //  alert("you continue");

    // const queryParams=[];
    // for(let i in this.state.ingredients){
    //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString=queryParams.join('&');
    // this.props.history.push({
    //     pathname:'/checkout',
    //     search: '?'+queryString
    // });
    this.props.history.push('/checkout');

}

    render() {
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key]<=0

        }
        let orderSummary = null;
       
       

        let burger = this.state.error?<p>can ot be loaded</p>:<Spinner/>
        if(this.props.ings)
        {
         burger = (
            <Aux>
               <Burger ingredients={this.props.ings}/>
                <BuildControls
                ingredientsAdded={this.props.onIngredientAdded}
                ingredientsRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchaseable={this.updatePurchaseState(this.props.ings)}
                price={this.props.price}
                ordered={this.purchaseHandler}
                />
            </Aux>
        );
        orderSummary =  <OrderSummary ingredients = {this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler} 
        purchaseContinue={this.purchaseContinue}
        price={this.props.price}
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

const mapStateToProps=state=>{
    return{
        ings:state.ingredients,
        price:state.totalPrice
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientname:ingName}),
        onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientname:ingName})
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
