import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Fruit from './Fruit'


class App extends Component 
{
  state = {
    fruits: []
  };
  insertIntoTable=()=>{
    let val = this.refs.textbox.value;
    console.log(val);
    let name =  val.split("-");
    let names = name[0];
    let price = name[1];
    const fruits = [...this.state.fruits];
    let length = fruits.length;

    const fruit =
    {
      name:names,
      price:price
    }
    fruits.push(fruit);
    this.setState({fruits:fruits});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const fruits = [...this.state.fruits];
    fruits.splice(personIndex, 1);
    this.setState({fruits: fruits});
  }

  handleKeyPress(target) {
    if(target.charCode==13){
      let val = document.getElementById("h").value;
      console.log(val);
      let name =  val.split("-");
      let names = name[0];
      let price = name[1];
      const fruits = [...this.state.fruits];
      const fruit =
      {
        name:names,
        price:price
      }
      fruits.push(fruit);
      this.setState({fruits:fruits});
    } 
  }
  

  render() {
    return (
      <div className="App">
        <p>gfkjskjhk</p>
        <input ref="textbox" id="h" onKeyPress={this.handleKeyPress} type="text"/>
        <button onClick={this.insertIntoTable}>Submit</button>
        {        
         this.state.fruits.map((person,index) => {
         return <Fruit
         name={person.name} 
          price={person.price}
          c={() => this.deletePersonHandler(index)}
        />
      })}
      </div>
    );
  }
}

export default App;

