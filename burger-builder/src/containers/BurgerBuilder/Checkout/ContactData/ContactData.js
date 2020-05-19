// import React, { useState } from 'react'
// import Button from '../../../../components/Ui/Button/Button';
// import classes from './contactData.module.css';
// import axios from '../../../../axiosOrders';
// import Spinner from '../../../../components/Ui/Spinner/Spinner';
// import Input from '../../../../components/Ui/Input/Input';
// import {connect} from 'react-redux';
// import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
// import * as actions from '../../../../store/actions/index'
// import {checkValidity,updateObject } from '../../../../shared/utility'

// const ContactData = props=> {
//     const [orderForm,setOrderForm] =  useState({
       
//         orderForm:{
//                 name:{
//                     elementType:'input',
//                     elementConfig:{
//                         type:'text',
//                         placeholder:'your name'
//                     },
//                     value:'',
//                     validation:{
//                         required:true
//                     },
//                     valid : false,
//                     touched:false
//                 },
//                 address:{
//                     elementType:'input',
//                     elementConfig:{
//                         type:'text',
//                         placeholder:'your address'
//                     },
//                     value:'',
//                     validation:{
//                         required:true,
//                         minLength:4
//                     },
//                     valid : false,
//                     touched:false
//                 },
//                  email:{
//                     elementType:'input',
//                     elementConfig:{
//                         type:'text',
//                         placeholder:'your email'
//                     },
//                     value:'',
//                     validation:{
//                         required:true
//                     },
//                     valid : false,
//                     touched:false
//                 },
//         deliveryMethod: {
//             elementType: 'select',
//             elementConfig: {
//                 options: [
//                     {value: 'fastest', displayValue: 'Fastest'},
//                     {value: 'cheapest', displayValue: 'Cheapest'}
//                 ]
//             },
//             value: 'fastest',
//             validation:{},
//             valid:true
        
//         }
//     }
// })
//    const [formIsValid,setFormIsValid] =  useState(false);
    
    

   
//     const orderHandler=(event)=>{
//         event.preventDefault();
//               const formData={};
//               for(let formElementIdentifier in orderForm){
//                   formData[formElementIdentifier]=orderForm[formElementIdentifier].value;
//               }
//         const order ={
//             ingredients:props.ings,
//             price:props.price,
//             orderData:formData,
//             userId:props.userId
//         }
//       props.onOrderBurger(order,props.token); 
//     }

//     // const inputChangedHandler=(event,inputIdentifier)=>{
//     //     console.log(event.target.value);
//     //     const updated = {
//     //         ...orderForm
//     //     };
//     //     const u = {
//     //         ...updated[inputIdentifier]
//     //     };
//     //     u.value=event.target.value;
//     //     u.valid=checkValidity(u.value,u.validation);
//     //     u.touched=true;
//     //     console.log(u);
//     //     updated[inputIdentifier]=u;
//     //     let formIsValids=true;
//     //     for(let inputIdentifier in updated)
//     //     {
//     //         formIsValids=updated[inputIdentifier].valid&&formIsValids
//     //     }
//     //     console.log(formIsValids);
//     //     setOrderForm(updated);
//     //     setFormIsValid(formIsValid);
        
        
//     // }

//     const inputChangedHandler = (event, inputIdentifier) => {
//         const updatedFormElement = updateObject(orderForm[inputIdentifier], {
//           value: event.target.value,
//           valid: checkValidity(
//             event.target.value,
//             orderForm[inputIdentifier].validation
//           ),
//           touched: true
//         });
//         const updatedOrderForm = updateObject(orderForm, {
//           [inputIdentifier]: updatedFormElement
//         });
    
//         let formIsValid = true;
//         for (let inputIdentifier in updatedOrderForm) {
//           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
//         }
//         setOrderForm(updatedOrderForm);
//         setFormIsValid(formIsValid);
//       };
    
    
    
//         const formElementsArray=[];
//         for(let key in orderForm){
//             formElementsArray.push({
//                 id:key,
//                 config:orderForm[key]

//             })
//         }
//         let form =( <form onSubmit={orderHandler}>

//             {formElementsArray.map(formElement=>(

//                 <Input 

//                 key={formElement.id}
//                 elementType={formElement.config.elementType}
//                 elementConfig={formElement.config.elementConfig}
//                 value={formElement.config.value}
//                 invalid={!formElement.config.valid}
//                 shouldValidate={formElement.config.validation}
//                 changed={(event)=>inputChangedHandler(event,formElement.id)}
//                 touched={formElement.config.touched}
//                 />
//             ))
//             }
          
          
//           <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
          
//             {/* <Input  inputtype="input"   type="text"    name="name" placeholder="your name"/>
//             <Input  inputtype="input"  type="email"   name="email" placeholder="your email"/>
//             <Input  inputtype="input"  type="text"    name="address" placeholder="your address"/>
//             <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button> */}
//         </form>);
//         if(props.loading)
//         {
//             form = <Spinner/>
//         }
//         return (
//             <div className={classes.ContactData}>
//                 <h4>enter your contact details</h4>
//                {form}
//             </div>
//         )
//     }

// const mapStateToProps=state=>{
//     return{
//         ings:state.burgerBuilder.ingredients,
//         price:state.burgerBuilder.totalPrice,
//         loading : state.order.loading,
//         token : state.auth.token,
//         userId:state.auth.userId
//     }
// };

// const mapDispatchToProps=dispatch=>{
//     return{
//         onOrderBurger: (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
//     }
  
// }

// export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
import React, { useState } from 'react'
import Button from '../../../../components/Ui/Button/Button';
import classes from './contactData.module.css';
import axios from '../../../../axiosOrders';
import Spinner from '../../../../components/Ui/Spinner/Spinner';
import Input from '../../../../components/Ui/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../../store/actions/index'
import {checkValidity,updateObject } from '../../../../shared/utility'

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
