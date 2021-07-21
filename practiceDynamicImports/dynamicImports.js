document.addEventListener('click', async () => {
    // imports have to be at the same time in one location otherwise browser will throw an error
    const { printModule, add, subtract } = await import("./module.js")
    // to set a defualt export (and therefore only 1 export) use this syntax:
    // const {defualt: printModule} = await import("./module.js")
    printModule()
    console.log(add(2,3));
    console.log(subtract(10,7));
})


console.log("In main file")

/*
An alternative to :
import printModule from "./module.js"
or even

if (true) {
    import("./module.js").then(module => {
        module.default
        printModule
    })

where 
import is a promise function so 
requires a .then when true.
you can even rewrite that line as

import("./module.js").then (({defualt: printModule}))
}

await import(etc) can be used to not have to deal with .then()
and async probably just makes things easier to deal with other things
going on 

The point of all this is to replace importing at the beginning 
with an import statement that occurs only when you need it by meeting
a condition, in this case, when clicking a blank document page.

*/