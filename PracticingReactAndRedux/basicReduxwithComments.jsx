import { Redux } from 'react-redux'

const ADD = "ADD"; //use constant globals where possible

// action creator -> a function that returns an object with a 
// type property. Data property like "message" here is optional 
const addMessage = (message) => {
    return {
        type: ADD,
        message
    //object creation shorthand, if there is a parameter and
    // property that you want to have similar names, just
    // put the property on a new line and javascript will 
    // figure it out that they mean "property: parameter"
    }
};

// Custom Reducer function that deals with state and actions
// with Reducers you are always trying to return either a new
// version of state (whether it's an array, object, string, etc)
// or just state itself. Basically psuedo-immutability of state
// is the goal.
// Note: all Reducers are called when a store dispatch is called
// so you use switch cases do determine if the action dispatched
// should modify state. That's why action.type is important
const messageReducer = (state=[], action) => {
    switch (action.type) {
        case ADD:
            return [...state, action.message];
        default:
            return state;
    }
};

// store is created to maintain state in a variable and use
// dispatch actions
const store = Redux.createStore(messageReducer);
// you dispatch action creators to the store to update state
store.dispatch(addMessage("Hello World"));

// you can create a store listener function that is called
// EVERY time a dispatch is called.
let count = 0
store.subscribe(()=>count++) 
console.log(count); // will display 1


// You can also combine reducers and have one master reducer

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

/* The key names will contain all of the state associated
 * with keys and handled by that specific reducer
*/
const rootReducer = Redux.combineReducers({
    auth: authReducer,
    counter: counterReducer
});

const store2 = Redux.createStore(rootReducer)
// this is where action.type becomes very important because
// all reducers will be called but only the right reducer will
// update the state.



// To handle asynchronous events use Redux middleWare
const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }


/*
 * To create an asynchronous action, 
 * you return a function in the action creator that takes 
 * dispatch as an argument. 
 * Within this function, you can dispatch actions and 
 * perform asynchronous requests.
 * handleAsync is a special action creator in this case
*/ 
const handleAsync = () => {
    return function(dispatch) {
      // Dispatch request action here
        dispatch(requestingData);
      setTimeout(function() {
       // Timeout here acts like a simulated API call
        // Dispatch received data action here
        dispatch(receivedData);
      }, 2500);
    }
  };

  const defaultState = {
    fetching: false,
    users: []
  };
  
  // state is an object here
  const asyncDataReducer = (state = defaultState, action) => {
    switch(action.type) {
      case REQUESTING_DATA:
        return {
          fetching: true,
          users: []
        }
      case RECEIVED_DATA:
        return {
          fetching: false,
          users: action.users
        }
      default:
        return state;
    }
  };
  
//ReduxThunk.defualt can be used to deal with async actions 
const store3 = Redux.createStore(asyncDataReducer, 
    Redux.applyMiddleware(ReduxThunk.default));



