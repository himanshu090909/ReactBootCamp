import React from 'react';
import styles from './appStyles.module.css';
const fruit = (props)=>{
    return(
         <div>
           <center><table className={styles.table}>
               <tbody className={styles.border}>
                <tr>
                 <td className={styles.td}>{props.name}</td>
                 <td className={styles.td}>{props.price}</td>
                 <td className={styles.td}><button className={styles.button1} onClick={props.deleteFruitHandler}>Delete</button></td>
                </tr> 
                </tbody>     
           </table>
           </center>
         </div>
    )
};

export default fruit;