// by itself this probably wont run
import React from 'react';


class DisplayMessages extends React.Component {
    // this is the constructor format for 
    // React Component classes
    constructor(props) { // passes in props tho props 
        // may or may not be used
        super(props); // just a call to super. 
        // not entirely sure what it does
        this.state = { // remember "this." when 
            // inside the constructor
            // Don't modify state directly (i.e. this.state.etc)
            // better to use this.setState and/or return a new object
            // with similar properties of state (like using .slice or .concat or
            // Object.assign()
            input: "",
            messages: []
            // custom properties of state
        }
        /** 
         * You can also define the event handlers here:
         * this.handleChange = this.handleChange.bind(this)
         * this.submitMessage = this.submitMessage.bind(this)
         */
    }
    // still in displayMessages

    // event handlers 
    handleChange = (event) => {
        this.setState(
            Object.assign({}, {input: event.target.value})
        )
    }

    // concat the current message stored in input to the messages
    // array in local state and then clear the value of input
    submitMessage = () => {
        this.setState(
            (state)=> ({ // ({}) means return object
            input: "",
            messages: [...state.messages, state.input]
            // alt -> messages: Object.assign({}, {
            // messages: state.message.concat(state.input)    
            //})
            })
        )
    }

    render() { //the mainly html portion of a react component
        // technically it is JSX which is a mix of javascript and html
        // before return this is where you can place any render 
        // variables
        const myVariable = "Does nothing";
        return (
            <div>
                <h2>Type in a new Message:</h2>
                <input 
                onChange={this.handleChange.bind(this)}
                value={this.state.input}
                />
                {/* this.handleChange.bind(this) is shorthand
                * for this.handleChange = this.handleChange.bind(this)
                * when placed in an html element */}
                <button
                onClick=
                {this.submitMessage.bind(this)}
                >
                Submit
                </button>
                {/* map each element in messages array
                 to a bullet point*/}
                <ul>
                    {this.state.messages.map(
                        (elem, index) => {
                            return <li key={index}>{elem}</li>
                        }
                    )}
                </ul>

                {/* This is a div to view that it is working */}
                <div>{this.state.input}</div>

                {/* 
                This is how you write comments in JSX space.
                */}
            </div>

        )

    }


}