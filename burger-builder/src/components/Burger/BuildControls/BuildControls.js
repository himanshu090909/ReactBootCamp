import React from 'react';
import classes from './buildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
 {label:'Salad',type:'salad'},
 {label:'Bacon',type:'bacon'},
 {label:'Cheese',type:'cheese'},
 {label:'Meat',type:'meat'}

];

const buildControls = (props)=>(

    <div className={classes.BuildControls}>
         <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
         {controls.map(ctrl=>(
             <BuildControl 
             key={ctrl.label} 
             label={ctrl.label}
             added={()=>props.ingredientsAdded(ctrl.type)}
             subtract={()=>props.ingredientsRemoved(ctrl.type)}
             disabled={props.disabled[ctrl.type]}
             
             />
         ))}
         <button className={classes.OrderButton}
         onClick={props.ordered}
         disabled={!props.purchaseable}>Order Now</button>
    </div>
);

export default buildControls;