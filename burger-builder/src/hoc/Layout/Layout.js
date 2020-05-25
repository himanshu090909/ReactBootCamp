import React,{useState} from 'react'
import Aux from '../Aux/Aux';
import classes from './layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
const Layout = props=> {
   
    const [sideDrawerIsVisible,setSideDrawerIsVisible]=useState(false);

   const sideDrawerClosedHandler=()=>{

    setSideDrawerIsVisible(false);
   }
   
   const sidedrawerToggleClicked=()=>{
       setSideDrawerIsVisible(!sideDrawerIsVisible)
   }
  
        return(
      <Aux>
        <Toolbar 
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sidedrawerToggleClicked}/>
        <SideDrawer
         isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible} closed={sideDrawerClosedHandler}/>
        <main className={classes.content}>
            {props.children}
        </main>
        </Aux>
        )
    }


const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null

    }
}
export default connect(mapStateToProps)(Layout);
