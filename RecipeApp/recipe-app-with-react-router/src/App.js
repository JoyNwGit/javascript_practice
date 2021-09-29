import React, { Component, useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes'
const API_KEY = "e92eb61c48de4c8e9b8485e0fb4f80e2";
const tempSearchType = "complexSearch"; // using Spoonacular API
const number = 10;
const addRecipeInformation=true;

/// Main page
const App = () => {

  //updates from react v16
  // dont need:
  // constructor() {
  //   this.state = {}
  // }
 
//   state = {
//  // this is enough
//     recipes: []
//   }
  const [state, setState] = useState( {recipes: []} );

  // mainly used by Form.js to fill out the rest of the page
  const getRecipe = async (event) => {
    // get the words in the input box
    const recipeName = event.target.elements.recipeName.value; 
    // console.log(recipeName);
    event.preventDefault(); // avoid a full page refresh as default behaviour

    const api_call = await fetch(
      `https://api.spoonacular.com/recipes/${
      tempSearchType}?apiKey=${
        API_KEY}&query=${
          recipeName}&number=${
            number}&addRecipeInformation=${
              addRecipeInformation}`
              );

    const response = api_call.json(); // actually retrieve the data

    response.then((data) => {
      setState({ recipes: data.results })
      // console.log(this.state.recipes); // "Stuff worked"
    }, function(err){
      console.log(err) // it broke
    })// end of response promise
  } // end of getRecipes fn
  

  useEffect(() => {
    // console.log("mounted");
    //  handle previous state
    const json = localStorage.getItem("recipes"); //happens before local storage is cleared
    const savedRecipes = JSON.parse(json);
    setState({recipes: savedRecipes}); // -> triggers the second useEffect hook
  }, []) // no dependencies the equivalent of component did mount (runs once at initialization)

  useEffect(() => {

    //handle saving current state
    const returnedRecipes = JSON.stringify(state.recipes);
    localStorage.setItem("recipes", returnedRecipes); 
    // this will stick when looking at indiv recipes
    // and, effectively, local storage doesnt get cleared -> constantly reapplied with state

    // console.log("updating");
  },[state.recipes]); //both mounts and updates based on state (refresh or new page). 

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={getRecipe}/>
        <Recipes recipes={state.recipes}/>
      </div>
    );
  }


export default App;