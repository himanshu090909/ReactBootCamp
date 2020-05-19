import React from 'react'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const Checkout = props =>{
    // state={
    //     ingredients:null,
    //     price: 0
    // }

    // componentWillMount()
    // {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients ={};
    //     let price=0;
    //     for(let param of query.entries())
    //     {
    //         if(param[0]==='price')
    //         {
    //             price=param[1];
    //         }
    //         else
    //         {
    //             ingredients[param[0]]=+param[1];

    //         }
            
    //     }
    //     this.setState({ingredients:ingredients, totalPrice:price})
    // }


    const checkoutCancelledHandler=()=>{
        props.history.goBack();
    }
    const checkoutContinued=()=>{
    props.history.replace('/checkout/contact-data');
    }

        let summary = <Redirect to="/"/>        
        if(props.ings){
            console.log('purchase',props.purchase)
            const purchasedRedirect = props.purchased ? <Redirect to="/"/>:null
            summary = (
                <div>
                    {purchasedRedirect}
            <CheckoutSummary ingredients={props.ings}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinued}
            />)
             <Route 
                path={props.match.path+'/contact-data'} 
                component={ContactData}/>
            </div>
            )
        }
        return summary;
             
            
    }


const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)
