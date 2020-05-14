import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState = {
    ingredients:null,
    totalPrice: 4,
    error:false,
    building:false
};
const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient={[action.ingredientname]:state.ingredients[action.ingredientname]+1
            }
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
            const updatedState = {
                ingredients:updatedIngredients,
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientname],
                building:true
            }
            return updateObject(state,updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientname]:state.ingredients[action.ingredientname]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientname],
                building:true


            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                error:false,
                totalPrice:4,
                building:false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }        
    }

    return state
};

export default reducer;