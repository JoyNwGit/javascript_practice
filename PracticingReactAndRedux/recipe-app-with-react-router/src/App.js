import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
const API_KEY = "e92eb61c48de4c8e9b8485e0fb4f80e2";
const tempSearchType = "complexSearch"; // using Spoonacular API
const number = 10;

class App extends Component {

  //updates from react v16
  // dont need:
  // constructor() {
  //   this.state = {}
  // }
 
  state = {
 // this is enough
    recipes: []
  }


  getRecipe = async (event) => {
    // get the words in the input box
    const recipeName = event.target.elements.recipeName.value; 
    event.preventDefault(); // avoid a full page refresh as default behaviour
    const api_call = await fetch(`https://api.spoonacular.com/recipes/${tempSearchType}?apiKey=${API_KEY}&number=${number}`);
    // console.log(recipeName);
    const response = api_call.json(); // actually retrieve the data
    response.then((data) => {
      this.setState({ recipes: data.results })
      // console.log(data.results[0].title); // "Stuff worked"
    }, function(err){
      console.log(err) // it broke
    }
    )
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
      </div>
    );
  }
}

export default App;