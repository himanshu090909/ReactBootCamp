import React from 'react';
import {Provider} from 'react-redux';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<BurgerBuilder/>',()=>{
    
    let wrapper;

  
    beforeEach(()=>{
      
      wrapper=shallow(
      <Provider>
      <BurgerBuilder onInitIngredients={()=>{}}/>
      </Provider>)
    })
    it('should render <build controls> when receiving ingredients',()=>{

        wrapper.setProps({ings:{salad:0}});
        expect(wrapper.find(
          BuildControls
          )).toHaveLength(1)
    }
       
    )
})