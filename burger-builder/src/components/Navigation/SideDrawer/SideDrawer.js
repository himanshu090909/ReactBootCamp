import React from 'react';
import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/NavigationItems';
import classes from './sideDrawer.module.css';
import Backdrop from '../../Ui/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
const sideDrawer = (props)=>{

    let attachedClasses = [classes.SideDrawer,classes.Close]
    if(props.open)
    {
        attachedClasses=[classes.SideDrawer,classes.Open]
    }
    return(
        <Aux>
<Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
<Logo height="11%" margin-bottom="32px"/>
<nav>
    <Navigationitems/>
</nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;