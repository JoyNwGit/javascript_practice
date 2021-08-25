import React, {useState, useEffect} from "react"
import { Link, useLocation } from "react-router-dom"
const API_KEY = "e92eb61c48de4c8e9b8485e0fb4f80e2";

/// Component of any specific recipe
const Recipe = ({match, location, history}) => {

    const [recipe, setRecipe] = useState( { activeRecipe: {} } );
    // const location = useLocation(); //helpful tool but not required

    useEffect(() => {
        fetchRecipe();
        // console.log(match);

        //if you want to pass a custom state value with a link button in Recipes.js
        // location has a built in state param
        // const { name: currentRecipe } = location.state; 
        // console.log("about info: ", currentRecipe);
    }, []);

        // get indiv recipe data to display on its own page
        const fetchRecipe = async () => {
            const fetchRecipe = await fetch(
                `https://api.spoonacular.com/recipes/${
                    match.params.id}/information?apiKey=${API_KEY}`
            );                                                                                                              
        
            const response = fetchRecipe.json();

            response.then((data) => {
                // console.log(data);
                setRecipe( {activeRecipe: data} );
                // console.log( "active recipe: ", recipe.activeRecipe );  
            }, function(err){
                console.log(err);
            })
        }

        const currentRecipe = recipe.activeRecipe;

        return (
            <div className="container">
                { //render elems when actually done in one go rather than phase in
                    Object.keys(currentRecipe).length !== 0 &&
                    <div className="active-recipe">
                        <img 
                        src={currentRecipe.image} 
                        alt={currentRecipe.title} 
                        className="active-recipe__img" />
                        <h3 className="active-recipe__title">{currentRecipe.title}</h3>
                        <h4 className="active-recipe__publisher">Publisher: <span>{currentRecipe.sourceName}</span>
                        </h4>
                        <p className="active-recipe__website">Website: <span><a href={currentRecipe.sourceUrl}>{currentRecipe.sourceUrl}</a></span>
                        </p>
                        <button className="active-recipe__button">
                        <Link to="/">Go Home</Link>
                        </button>
                    </div>
            }
            </div>
        )
}

export default Recipe