import React from 'react';
import {Link} from "react-router-dom";
/// Used to Display all the returned recipes - technically always visible
/// just doesnt have anything to display until getRecipe in App.js is called 
/// which calles setState which rerenders the UI
const Recipes = props => {

    const quickStyle = {
        marginBottom: "2rem"
    }

    return (
        <div>
            <div className="row">
            {
            //dont forget the key for react!
            // btw the ?. is like a checker for if a function/object/reference thing exists that
            // can be used to prevent crashes. add them from right to left: ?.map then ?.recipes, etc. 
            // i say this because if something in between isnt there like recipes, it'll still try to run map
            // and potentially crash
            // Also note, since the property that was passed in to Recipes component is named 
            // recipes, I now have access to props.recipes. And since the value of props.recipes
            // is this.state.recipes, it still works
            props?.recipes?.map((recipe) => {
            // to avoid the key warning, put the key in the most parent element!
            return (
                <div key={recipe.id} className="col-md-4" style={quickStyle}>
                        <div className="recipes__box">
                            <img className="recipe__box-img" 
                            src={recipe.image} 
                            alt={recipe.title}/>
                            <div className="recipe__text">
                                <h5 className="recipes__title">
                                {
                                    recipe.title.length < 20 ? `${recipe.title}` 
                                    : `${recipe.title.substring(0,25)}...`
                                }
                                </h5>
                                <p className="recipes__subtitle">Source: <span>
                                { recipe.sourceName }
                                </span></p>
                            </div>
                            <button className="recipe_buttons">
                                <Link to={
                                    { 
                                        pathname: `recipe/${recipe.id}`,
                                        state: {
                                            name: recipe.title
                                        }
                                    }
                                }>View Recipe</Link> 
                            </button>
                        </div>
                    </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Recipes;

