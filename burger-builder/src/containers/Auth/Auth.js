import React, { useState,useEffect } from 'react'
import Input from '../../components/Ui/Input/Input';
import classes from './auth.module.css';
import Button from '../../components/Ui/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/Ui/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../shared/utility';
const Auth = props => {
    
    const[authForm,setAuthForm] =  useState({
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid : false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'passsword',
                    placeholder:'your password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 6
                },
                valid : false,
                touched:false
            }
        })
        const[isSignup,setIsSignup] =  useState(true);

    const {buildingBurger,authRedirectPath,onSetAuthRedirectPath} = props
    useEffect(()=>{
        if(!buildingBurger && authRedirectPath!=='/'){
            onSetAuthRedirectPath();
        }
    },[buildingBurger,authRedirectPath,onSetAuthRedirectPath])
    
     const inputChangedHandler = (event,controlName)=>{
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value,authForm[controlName].validation),
                touched:true

            }
        };
        setAuthForm(updatedControls);
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value,isSignup)
    }

   const switchAuthModeHandler=()=>{
     setIsSignup(!isSignup);
    }

        const formElementsArray=[];
        for(let key in authForm){
            formElementsArray.push({
                id:key,
                config:authForm[key]

            })
        }

        
        let form = formElementsArray.map(formElement=>(
            <Input
            key = {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            changed={(event)=>inputChangedHandler(event,formElement.id)}
            touched={formElement.config.touched}
            />
        ))

        if(props.loading)
        {
            form=<Spinner/>
        }

        let errorMessage=null;
          
        if(props.error){
            errorMessage=(
                <p>{props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect=<Redirect to={props.authRedirectPath}/>
        }


        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                 {form}
                 <Button btnType="Success">Submit</Button>
                </form>
        <Button 
        clicked={switchAuthModeHandler}
        btnType="Danger">Switch to {isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
            </div>
        )
        
        }

const mapStateToProps = state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,passsword,isSignup)=>dispatch(actions.auth(email,passsword,isSignup)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)
