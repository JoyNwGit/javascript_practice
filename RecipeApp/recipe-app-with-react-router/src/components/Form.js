import React from 'react';

/// just a component of an input field and a button that calls
/// App.js's get recipe function on form submit because it was passed as a prop 
const Form = (props) => 
{
    const quickStyle = {
        marginBottom: "2rem"
    }
    return (
        <form onSubmit={props.getRecipe}  style={quickStyle}>
            <input className="form__input" type="text" name="recipeName"/>
            <button className="form__button">Search</button>
        </form>
    )
}
export default Form;