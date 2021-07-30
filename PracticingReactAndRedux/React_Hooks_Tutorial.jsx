// React Hooks Tutorial
/**
 * Hooks give access to lower level features of React
 * outside of the context of a component (avoid endless wrapping)
 * Hooks are like low level primatives or building blocks
 * Hooks to learn:
 * Basic Hooks =>
 *  - useState: Handle Reactive Data - when data changes re-render the UI
 *  - useEffect: Lifecycle Management based on state of component - Basically event handlers that occur 
 * whenever a state of the component changes somehow (initialization, change, removal)
 *  - useContext: Share data without passing props
 * Additional Hooks =>
 *  - useReducer: A different way to manage state like Redux
 *  - useCallback: Memoization -> Cache a function
 *  - useMemo: Memoization -> cache result of function call
 *  - useRef: Create a mutable object that will keep the same reference between renders
 *  - useImperativeHandle: Change behavior of exposed ref
 *  - useLayoutEffect: similar to useEffect just that it runs after render but before painting the screen
 *  - useDebugValue: custom labels for custom hooks in react dev tools on your browser
 * 
 * */
const { useState, useEffect, createContext,
        useContext, useMemo, useCallback,
        useRef, useImperativeHandle, useLayoutEffect, useDebugValue } = require("react");

 

//Example 1
function App() {
    useHook(); // Hooks only work at the top-level of a functional component

    const fun = () => {
        useHook(); // won't work here 
    }

    return <button onClick={() => useHook() }></button> // won't work here

    // hooks won't work in functions, nested functions, loops, etc.
    // Exception: when used with custom hooks
}
// Example useState

function App() {
    // [reactive data/state, setter function of whatever you want]
    const [count, setCount] = useState(0); // optional argument for the default state.

    // button onclick is equivalent to this.setState({count: this.state.count + 1})
    // {count} equivalent to {this.state.count}
    return (
        <button onClick={() => setCount(count+1)}>
        {count}
        </button>
        );
}

// Lifecycle Events to remember
/**
 * componentDidMount() {
 * // initialized -> on
 * }
 * 
 * componentDidUpdate() {
 * // state updated
 * }
 * 
 * componentWillUnmount() {
 * // destroyed -> off
 * }
 */

// Example useEffect
 function Btn() {

    const [count, setCount] = useState(0);
    const [loaded, setLoaded] = useState(false);

 //   Runs the useEffect function when mounted and when ANY state changes
    useEffect(()=> {
        alert('hello side effect!')

        //teardown function whe the component is destroyed
        return () => alert('goodbye component!') // Run before component is removed from UI
    })

    useEffect(() => {
        fetch('foo').then(()=> setLoaded(true))
        // causes infinite loop. Sets loaded to true which updates state which procs
        // useEffect which sets loaded to true and so on. 
    },
    [count] //to avoid this, add an array of dependencies (allows for more control when state changes updates ui)
    // empty array means no dependencies, meaning it will only run once when the component is initialized
    // Adding a state will track will rerun the function when that state dependency changes - when count changes
    )

    return (
        <button onClick={() => setCount(count+1)}>
        {count}
        </button>
        );
}

// Example useContext
const moods = {
    happy: '😃',
    sad: "😭"
}

const MoodContext = createContext(moods);

function App(props) {

    // Provider of context with this value can pass those props down to any children
    return (
        <MoodContext.Provider value={moods.happy}>
        <MoodEmoji />
        </MoodContext.Provider>
    );
}

// useContext allows you to access and consume the context from the useContext Provider
// which might live many levels higher in the component tree
function MoodEmoji() {
    const mood = useContext(MoodContext); // consume value from nearest parent provider
    return <p>{ mood }</p>
}

// useContext hook is a cleaner replacement for the consumer
function MoodEmoji2() {
    return <MoodContext.Consumer>
    { ({mood}) => <p>{mood}</p> }
    </MoodContext.Consumer>
}

// Example useRef
function App() {
    const count = useRef(0); 
    // similar to setState in that there is a mutable value but it does not
    // re-render the UI

    // count.current references the current count
    return (
        <button onClick={() => count.current++ }>
        {count.current}
        </button>
    )
    // useful when you want to track something in the background but not have it show on screen
}

function App() {
    const myBtn = useRef(null);
    const clickIt = () => myBtn.current.click(); // => won't update anything on the UI but because
    // of the ref keyword in the button in the return, it will click it for you
    // common use case is the grab native HTML elements from JSX ( and ultimately the DOM)

    return (
        <button ref={myBtn}></button>
    )
}

// Example useReducer
// part 1
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return state+1;
        case 'decrement':
            return state-1;
        default:
            throw new Error();
    }
}
// part 2
function App() {

    // dispatch actions -> reducer func -> store (compute next state) -> UI -> back to actions
    // Remember => Action consists of type: string, optional payload: any
    const [state, dispatch] = useReducer(reducer, 0, init) //reducer, initial state, init
    return (
        <temp>
        Count: {state}
        <button onClick={()=> dispatch({type: 'decrement'})}>-</button>
        <button onClick={()=> dispatch({type: 'increment'})}>+</button>
        </temp>
    );
}

// Why not use setState? It does the same thing! Answer: This is a lot better when managed 
// at scale and complexity grows

//Example useMemo
function App() {
    const [count, setCount] = useState(60);
    
    const expensiveCount = useMemo(() => {
        return count ** 2; // count^2;
    }, [count]); // Caution: use memo only as needed for expensive calculations
//depedency called when state is updated
    return (
        <temp>
        </temp>
    )
}

//Example useCallback
function App() {
    const [count, setCount] = useState(60);
    const showCount = useCallback(() => {
        alert(`Count ${count}`)
    }, [count])// can prevent unnecessary rerenders of the childen
    // because they will all be using the same function object 

//use case when function passed to multiple children
    reuturn (
    <temp>
    <SomeChild handler={showCount}/>
    </temp>
    )
}

// Example useImperativeHandle
//part 1
function App() {
    const ref = useRef(null);
    return <CoolButton ref={ref}></CoolButton>
}

//part 2
function CoolButton (props, ref) {
const myBtn = useRef(null);

useImperativeHandle(ref, 
    () => ({ //modify the exposed ref - rare use-case
    click: () => {
        // modify the exposed ref but rare usecase
        console.log('clicking button');
        myBtn.current.click();
    }
    }),
    [input]
    )

    return (
        <button ref={myBtn}></button>
    )
}
CoolButton = forwardref(CoolButton); 
// forwardref makes the ref available when the component
// is used

//example useLayoutEffect()
function App() {
    const myBtn = useRef(null);
    useLayoutEffect(() => { // Caution: blocks visual updates until your callback is finished
        const rect = myBtn.current.getBoundingClientRect();
        console.log(box.height);
        // can be useful for calculating scroll position before DOM is visually updated
    })
    return <temp><button ref={ref}></button></temp>
}

// Example useDebugValue
function useDisplayName(){

    const [displayName, setDisplayName] = useState();

    useEffect(()=> {
        const data = fetchFromDatabase(props.userId);
        setDisplayName(data.displayName);
    },[]);

    useDebugValue(displayName ?? 'loading...');
     // will show the displayname as name of the custom hook
     // as well as show hooks used in this hook like useState and useEffect

    return displayName;
}

function App() {
    const displayName = useDisplayName();
    return <button>{displayName}</button>
}