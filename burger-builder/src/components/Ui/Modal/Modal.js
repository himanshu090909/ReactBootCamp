import React from 'react';
import classes from './modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props=>
{
//     shouldComponentUpdate(nextProps,nextState){
//     return nextProps.show !==this.props.show || nextProps.children!==this.props.children;
// }

// componentWillUpdate(){
//     console.log('modal.js will update')
// }

        return(
    <Aux>    

    <Backdrop show={props.show} clicked={props.modalClosed}/>

    <div className={classes.Modal}
    style={{transform:props.show?'translateY(0)':'translateY(-100vh)',
opacity: props.show?'1':''
}}
>
    {props.children}
</div>
</Aux>

        )
    }

    export default React.memo(
        Modal,
        (prevProps, nextProps) =>
          nextProps.show === prevProps.show &&
          nextProps.children === prevProps.children
      );
      