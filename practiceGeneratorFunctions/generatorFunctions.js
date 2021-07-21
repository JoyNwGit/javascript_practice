function* generatorFunction() {


console.log("Before 1");
yield 1
console.log("After 1");
console.log("Before 2");
yield 2
console.log("After 2");
console.log("Before 3")
yield 3
console.log("After 3")
let id = 1;
    while (true)
    {
        yield id
        id++
    }
}

const generator = generatorFunction()
console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())


/*
The special star on function* means it's a generator function.
Generator functions can use yield which is like breakpoints but you can
then use it to run something else asynchronously. You would then call .next() 
on your generator to actually get it to move until the next yield statement or end. 
Not only that, it doesn't run on its own even when called until you call the first
.next().

Ex: while (true) -> this will increment id but then stop on every yield.
*/