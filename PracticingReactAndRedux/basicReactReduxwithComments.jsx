//Intro to Provider
/**
 * React Redux has a small API with 
 * 2 key features: Provider and connect.
 * 
 * Provider is a wrapper component from ReactRedux that wraps
 * your React app so throughout your React component tree you 
 * can access the Redux store and dispatch functions.
 * 
 * In other words, Provider lets your React app access and
 * update state through dispatch calls based on action type!
 * 
 * Provider takes 2 props, the Redux store and the child components
 * of your app (or if you have one parent component that makes
 * use of a bunch of child components, you can just use the 
 * parent component)
 */

//psuedocode
{/* <Provider store={store}>
    <App/>
</Provider> */}



//Lets combine some React and Redux from earlier:

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer);

// React:

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {  
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};


//This is how you call and use Provider
const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Presentational />
            </Provider>
        );
    }
};

//should really call it ReactReduxReact from all the wrapping

/**
 * side note: class names like "Presentational" are more for React
 * components that focus mainly on rendering elements and 
 * presentation of the UI based on props they receive.
 * Container components that dispatch actions to the store and 
 * pass store state to child components as props are the ones
 * connected to Redux.
 */


// Intro To connect

/**
 * The connect method allows you to map state and dispatch
 * to the "props" of one of your React components.
 * Connect takes 2 args: mapStateToProps() and mapDispatchToProps()
 */

// Declare what pieces of state you want to have access to
// sidenote: store.subscribe is used in ReactRedux to implement
// this function behind the scenes.
const mapStateToProps = (state) => {
    return {
        messages: state
    }
};

// Declare which action creators you need to be 
// able to dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        submitNewmessage: (message) => {
            dispatch(addMessage(message))
        }
    }
};

const connect = ReactRedux.connect;

// Here we can connect the Presentational component to Redux
// using a special syntax and assign it to a variable
const Container = 
connect(mapStateToProps, mapDispatchToProps)(Presentational);

// note: you can replace either mapState or mapDispatch
// with null if you don't need the Presentational component
// to have access to state or dispatch, respectively.

// Put it all together and you get:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Presentational extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '' //messages removed
      }
      this.handleChange = this.handleChange.bind(this);
      this.submitMessage = this.submitMessage.bind(this);
    }
    handleChange(event) {
      this.setState({
        input: event.target.value
      });
    }
    submitMessage() {
        // this.props gained the property submitNewMessage which is actually a function that
        // will take in the message and manage the state message on the Redux side!
      this.props.submitNewMessage(this.state.input) 
      this.setState(() => ({
        input: '' //messages removed and state removed as a reference to it here goes unused
      }));
    }
    render() {
      return (
        <div>
          <h2>Type in a new Message:</h2>
          <input
            value={this.state.input}
            onChange={this.handleChange}/><br/>
          <button onClick={this.submitMessage}>Submit</button>
          <ul>
            {this.props.messages.map( (message, idx) => { //uses this.props instead of this.state
                return (
                   <li key={idx}>{message}</li>
                )
              })
            }
          </ul>
        </div>
      );
    }
  };

const Container = 
connect(mapStateToProps, mapDispatchToProps)(Presentational);
class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // Complete the return statement:
        return (
          <Provider store={store}>
            <Container />
            </Provider>
        );
    }
};

  // So what does all this mean?
  // React Components can manage their own state locally.
  // However Redux allows for scale with 1 main point of contact - the store
  // what this means is that if you have specific properties of state that
  // you want to manage across seperate React components (i.e. massive scaling) then
  // you give it to Redux to manage. 
  // In other words Redux is like a global variable and React are local variables, if
  // this analogy makes sense.

  // SideNote: store has store.getState() if you need the state and 
  // connect (depending on how its implemented) does some magic where either your
  // it either auto dispatches when mapDispatchToProps is passed in to your component
  // or just gives your component props.dispatch to manually use when mapDispatchToProps
  // isn't passed in: connect()(Component) --> also you don't have to pass in null
  // you can just pass in nothing too!

