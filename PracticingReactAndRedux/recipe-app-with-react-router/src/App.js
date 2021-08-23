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
    // console.log(recipeName);
    event.preventDefault(); // avoid a full page refresh as default behaviour
    const api_call = await fetch
    (`https://api.spoonacular.com/recipes/${tempSearchType}?apiKey=${API_KEY}&query=${recipeName}&number=${number}`);
    const response = api_call.json(); // actually retrieve the data
    response.then((data) => {
      this.setState({ recipes: data.results })
      console.log(this.state.recipes); // "Stuff worked"
    }, function(err){
      console.log(err) // it broke
    })// end of response promise
  } // end of getRecipes fn
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        {
          //dont forget the key for react!
          // btw the ?. is like a checker for if a function/object/reference thing exists that
          // can be used to prevent crashes. add them from right to left: ?.map then ?.recipes, etc. 
          // i say this because if something in between isnt there like recipes, it'll still try to run map
          // and potentially crash
          this.state?.recipes?.map((recipe) => {
            // to avoid the key warning, put the key in the most parent element!
            return (
              <div key={recipe.id}>
              <img src={recipe.image} alt={recipe.title}/>
                <p>{recipe.title}</p>
              </div>
              )
          })
        }
      </div>
    );
  }
}

export default App;