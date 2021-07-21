
var g = "global";

function app(fun) {
    console.log(g);
   fun("hello world");
}

app((input)=> console.log(input));


// console.log(x);

const myObj = {
    name: "Greg",
    face: "😴",
    age: 99,
    hello: function() { // "this" is bound to the calling object
        console.log(this);
    },
    hello2: () => { // in lamba's, "this" is not bound to the calling object and goes global (so maybe Window in browsers)
        console.log(this);
    }
}

myObj.hello();
myObj.hello2();

const greg = {
    face: "😴",
}

const ghost = {
    face: "👻",
}

function hello() {
    return this.face;
}

const result = hello.call(greg); // function.call() calls a function with a given this 
// value and arguments provided individually.
// in other words it is like calling this.face for the calling object. Here greg is assigned as the calling object
// aka the "this" and forcing it to call this.face. It's like a function asking an object to give back something

console.log(result);