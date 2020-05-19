import React, { useState,useEffect,useCallback } from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/Ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect,useDispatch,useSelector} from 'react-redux';
import * as BurgerBuilderActions from '../../store/actions/index';


export const BurgerBuilder = props=> {
    const[purchasing,setPurchasing] =  useState(false)

    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
      });
      const price = useSelector(state => state.burgerBuilder.totalPrice);
      const error = useSelector(state => state.burgerBuilder.error);
      const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onIngredientAdded=(ingName)=>dispatch(BurgerBuilderActions.addIngredient(ingName));
    const onIngredientRemoved=(ingName)=>dispatch(BurgerBuilderActions.removeIngredient(ingName));
    const onInitIngredients=useCallback(()=>dispatch(BurgerBuilderActions.initIngredients()),[]);
    const onInitPurchase=()=>dispatch(BurgerBuilderActions.purchaseInit());
    const onSetAuthRedirectPath= (path)=>dispatch(BurgerBuilderActions.setAuthRedirectPath(path));




    // componentDidMount(){
    //     // axios.get('https://burger-builder-b435e.firebaseio.com/ingredients.json')
    //     // .then(response=>{
    //     //     this.setState({ingredients:response.data})
    //     // }).catch(error=>{
    //     //     this.setState({error:true})
    //     // });
    //     this.props.onInitIngredients();
    // }

    useEffect(()=>{
      onInitIngredients();
    },[onInitIngredients])

    const  purchaseHandler=()=>{
         if(isAuthenticated)
         {
            setPurchasing(true)
         }
         else
         {
             onSetAuthRedirectPath('/checkout')
             props.history.push('/auth')
         }
         
     }

   const  updatePurchaseState = (ingredients)=>{
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

     const purchaseCancelHandler=()=>{
         setPurchasing(false)
     }

      const  purchaseContinue=()=>{

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
    onInitPurchase();
    props.history.push('/checkout');

}

        const disabledInfo={
            ...ings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key]<=0

        }
        let orderSummary = null;
       
       

        let burger = error?<p>can ot be loaded</p>:<Spinner/>
        if(ings)
        {
         burger = (
            <Aux>
               <Burger ingredients={ings}/>
                <BuildControls
                ingredientsAdded={onIngredientAdded}
                ingredientsRemoved={onIngredientRemoved}
                disabled={disabledInfo}
                purchaseable={updatePurchaseState(ings)}
                price={price}
                isAuth={isAuthenticated}
                ordered={purchaseHandler}
                />
            </Aux>
        );
        orderSummary =  <OrderSummary ingredients = {ings}
        purchaseCancelled={purchaseCancelHandler} 
        purchaseContinue={purchaseContinue}
        price={price}
        />;

        }
        // if(this.state.loading){
        //     orderSummary=<Spinner/>
        // }
        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                 {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );

    }
    



export default withErrorHandler(BurgerBuilder,axios);
