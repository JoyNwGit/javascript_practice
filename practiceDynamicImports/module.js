function printModule() {
    console.log("This is in the module file")
}

// add export syntax like this
export const add = (x, y) => {
    return x + y;
  }
  
const subtract = (x,y) => {
    return x - y;
}

// or like this
export {printModule , subtract }
