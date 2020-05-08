import React from 'react'
import classes from './order.module.css';

const Order = (props) => {

const ingredients=[];
for(let ingredientName in props.ingredients)
{
    ingredients.push({
         name : ingredientName,
         amount :props.ingredients[ingredientName]})
}

const ingredientOutput = ingredients.map(ig=>{
    return <span>{ig.name} {ig.amount}</span>
});

    return (<div className={classes.Order}>
        {console.log(ingredientOutput)}
        <p>
        
            Ingredirents : {ingredientOutput}
        </p>
        <p>
            Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
        </p>
    </div>);


}

export default Order
