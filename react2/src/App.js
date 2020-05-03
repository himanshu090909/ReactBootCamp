import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Fruit from './Fruit'
import styles from './appStyles.module.css';

class App extends Component 
{
  state = {
    fruits: []
  };


    insertIntoTable=()=>{
    let val = this.refs.textbox.value;
    if(val===''||this.countCharacter(val)>1)
    {
      alert("input is wrong please provide proper input")
    }
    else
    {
    let name =  val.split("-");
    let names = name[0];
    let price = name[1];
    if(isNaN(price))
    {
      alert("quantity should be an number");
    }
    else
    {
    const fruits = [...this.state.fruits];
    const fruit =
    {
      name:names,
      price:price
    }
    fruits.push(fruit);
    this.setState({fruits:fruits});
    this.clearTextArea();
  }
  }
  }

  clearTextArea()
  {
    document.getElementById("textBoxId").value='';
  }

   deleteFruitHandler = (index) => {
    const fruits = [...this.state.fruits];
    fruits.splice(index, 1);
    this.setState({fruits: fruits});
  }

  countCharacter(string)
  {
    let count =0;
    for(let elements of string)
    {
      if(elements=='-')
      {
        count=count+1;
      }
    }
    return count;
  }

  handleKeyPress = (target) =>{
    if(target.charCode==13){
      this.insertIntoTable();
    } 
  }

  render() {
    return (
      <div className="App">
        <p className={styles.header}>React Assignment</p>
       
        <input className={styles.textBox} ref="textbox" id="textBoxId" onKeyPress={this.handleKeyPress} type="text"/>
        <br/>
       
        <button className={styles.button} onClick={this.insertIntoTable}>Submit</button>
        {        
             this.state.fruits.map((fruit,index) => {
            return <Fruit
            name={fruit.name} 
            price={fruit.price}
            deleteFruitHandler={() => this.deleteFruitHandler(index)}
        />
      })}
      </div>
    );
  }
}

export default App;