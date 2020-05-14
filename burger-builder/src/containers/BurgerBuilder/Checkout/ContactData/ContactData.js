import React, { Component } from 'react'
import Button from '../../../../components/Ui/Button/Button';
import classes from './contactData.module.css';
import axios from '../../../../axiosOrders';
import Spinner from '../../../../components/Ui/Spinner/Spinner';
import Input from '../../../../components/Ui/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../../store/actions/index'
class ContactData extends Component {
    state={
       
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'your name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid : false,
                    touched:false
                },
                address:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'your address'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:4
                    },
                    valid : false,
                    touched:false
                },
                 email:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'your email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid : false,
                    touched:false
                },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation:{},
            valid:true
        
        }
    },
    formIsValid :false
    }

    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
          isValid=value.trim()!==''&&isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength&&isValid
        }
        return isValid;
    }

    orderHandler=(event)=>{
        event.preventDefault();
              const formData={};
              for(let formElementIdentifier in this.state.orderForm){
                  formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
              }
        const order ={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
      this.props.onOrderBurger(order,this.props.token); 
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        console.log(event.target.value);
        const updated = {
            ...this.state.orderForm
        };
        const u = {
            ...updated[inputIdentifier]
        };
        u.value=event.target.value;
        u.valid=this.checkValidity(u.value,u.validation);
        u.touched=true;
        console.log(u);
        updated[inputIdentifier]=u;
        let formIsValids=true;
        for(let inputIdentifier in updated)
        {
            formIsValids=updated[inputIdentifier].valid&&formIsValids
        }
        console.log(formIsValids);
        this.setState({orderForm:updated,formIsValid:formIsValids});
        console.log('state valid',this.state.formIsValid);
        
    }
    
    render() {

        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]

            })
        }
        let form =( <form onSubmit={this.orderHandler}>

            {formElementsArray.map(formElement=>(

                <Input 

                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                touched={formElement.config.touched}
                />
            ))
            }
          
          
          <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
          
            {/* <Input  inputtype="input"   type="text"    name="name" placeholder="your name"/>
            <Input  inputtype="input"  type="email"   name="email" placeholder="your email"/>
            <Input  inputtype="input"  type="text"    name="address" placeholder="your address"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button> */}
        </form>);
        if(this.props.loading)
        {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>enter your contact details</h4>
               {form}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId:state.auth.userId
    }
};

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger: (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
