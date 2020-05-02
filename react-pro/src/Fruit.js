import React from 'react';

const fruit = (props)=>{
    return(
         <div>
           <table>
                <tr>
                 <td>{props.name}</td>
                 <td>{props.price}</td>
                 <td><button onClick={props.c}>Delete</button></td>
                </tr>      
           </table>
         </div>
    )
};

export default fruit;
