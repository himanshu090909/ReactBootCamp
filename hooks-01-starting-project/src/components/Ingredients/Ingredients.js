// import React,{useState,useEffect,useCallback} from 'react';

// import IngredientForm from './IngredientForm';
// import IngredientList from './IngredientList';
// import Search from './Search';
// import ErrorModal from '../UI/ErrorModal';

// const Ingredients=()=> {
//   const [userIngredients,setUserIngredients]=useState([]);
//   const [isLoading,setIsLoading] = useState(false);
//   const [error,setError] = useState();
//   // useEffect(() => {
//   //   fetch('https://react-hooks-b3a92.firebaseio.com/ingredients.json')
//   //     .then(response => response.json())
//   //     .then(responseData => {
//   //       const loadedIngredients = [];
//   //       for (const key in responseData) {
//   //         loadedIngredients.push({
//   //           id: key,
//   //           title: responseData[key].title,
//   //           amount: responseData[key].amount
//   //         });
//   //       }
//   //       setUserIngredients(loadedIngredients);
//   //     });
//   // }, []);

//   const filteredIngredientsHandler = useCallback(filteredIngredients=>{
//     setUserIngredients(filteredIngredients);
//   },[]);

//   const addIngredientHandler = ingredient =>{
//     setIsLoading(true)
//     fetch('https://react-hooks-b3a92.firebaseio.com/ingredients.json',{
//       method: 'POST',
//       body: JSON.stringify(ingredient),
//       headers:{'Content-Type':'application/json'}
//     }).then(response=>{
//       setIsLoading(false)
//       return response.json();}).then(responseData=>{
//         setUserIngredients(prevIngredients=>[
//           ...prevIngredients,
//           {id:responseData.name,...ingredient}
//         ])
//       })
     
//     }
    
//   const removeIngredientHandler = ingredientId => {
//     setIsLoading(true)
//     fetch(`https://react-hooks-b3a92.firebaseio.com/ingredients/${ingredientId}.json`,{
//       method: 'DELETE',
     
//     }).then(response=>{
//       setIsLoading(false)
//     setUserIngredients(prevIngredients =>
//       prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
//     );
//     }).catch(error=>{
//       setError('something went wrong');
//     })
//   };

//   const clearError = ()=>{
//     setError(null);
//     setIsLoading(false)
//   }
  
//   return (
//     <div className="App">

//       {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
//       <IngredientForm onAddIngredient={addIngredientHandler}
//       loading={isLoading}/>

//       <section>
//         <Search onLoadIngredients={filteredIngredientsHandler}/>
//         <IngredientList
//         ingredients={userIngredients}
//         onRemoveItem={removeIngredientHandler}
//         />
//       </section>
//     </div>
//   );
// }

// export default Ingredients;

import React,{useReducer,useMemo,useCallback,useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http'

const ingredientReducer = (currentIngredients,action)=>{
  switch (action.type){
    case 'SET':
      return action.ingredients;
      case 'ADD':
        return [...currentIngredients,action.ingredient];
        case 'DELETE':
          return currentIngredients.filter(ing=>ing.id!==action.id);
          default:
            throw new Error('should not get there!');

  }
}



const Ingredients=()=> {
  const[userIngredients,dispatch] = useReducer(ingredientReducer,[]);
  const {isLoading,data,error,sendRequest,reqExtra,reqIdentifer,clear} = useHttp();
  //const [userIngredients,setUserIngredients]=useState([]);
  //const [isLoading,setIsLoading] = useState(false);
  //const [error,setError] = useState();
  // useEffect(() => {
  //   fetch('https://react-hooks-b3a92.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

  useEffect(()=>{
    if(!isLoading && !error && reqIdentifer==='REMOVE-INGREDIENT'){

      dispatch({type:'DELETE',id:reqExtra});
    }
    else if(!isLoading && !error && reqIdentifer==='ADD-INGREDIENT')
    {
      dispatch({
              type:'ADD',
              ingredient: {id:data.name,...reqExtra}
            })
    }

     
  },[data,reqExtra,reqIdentifer,isLoading,error])

  const filteredIngredientsHandler = useCallback(filteredIngredients=>{
    //setUserIngredients(filteredIngredients);
    dispatch({
      type:'SET',
      ingredients:filteredIngredients
    }) 
  },[]);

  const addIngredientHandler = useCallback(ingredient =>{
    //   dispatchHttp({type:'SEND'})
    //   fetch('https://react-hooks-b3a92.firebaseio.com/ingredients.json',{
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers:{'Content-Type':'application/json'}
    // }).then(response=>{
    //   dispatchHttp({type:'RESPONSE'})
    //   return response.json();}).then(responseData=>{
    //     // setUserIngredients(prevIngredients=>[
    //     //   ...prevIngredients,
    //     //   {id:responseData.name,...ingredient}
    //     // ])
    //     dispatch({
    //       type:'ADD',
    //       ingredient: {id:responseData.name,...ingredient}
    //     })
    //   })

    sendRequest(
      'https://react-hooks-b3a92.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD-INGREDIENT'
    )
     
    },[sendRequest])
    
  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://react-hooks-b3a92.firebaseio.com/ingredients/${ingredientId}.json`,
    'DELETE',
    null,
    ingredientId,
    'REMOVE-INGREDIENT')
   
  },[sendRequest]);

  // const clearError = useCallback(()=>{
  //  // dispatchHttp({type:'CLEAR'})
  // },[]);

  const ingredientList = useMemo(()=>{
    return(
      <IngredientList
      ingredients={userIngredients}
      onRemoveItem={removeIngredientHandler}
      />
    )
  },[userIngredients,removeIngredientHandler])
  
  return (
    <div className="App">

      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler}
      loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
       {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;

