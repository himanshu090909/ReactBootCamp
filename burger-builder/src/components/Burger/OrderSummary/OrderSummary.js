import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../Ui/Button/Button';

const OrderSummary = props=>{

    const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey=>{
           return(
               <li key={igkey}>
                   <span style={{textTransform: 'capitalize'}}>{igkey}</span>:{props.ingredients[igkey]}
               </li>
           );
    });
      return(
        <Aux>
        <h3>Your order</h3>
        <p>a burger with following ingredients</p>
        <ul>
            {ingredientSummary}
        </ul>

        <p><strong>Total price: {props.price.toFixed(2)}</strong></p>   
          
        <p>Continue to checkout</p>
      
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>

      )
  }

export default OrderSummary;