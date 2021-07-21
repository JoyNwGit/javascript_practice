function custom(strings, ...values){
    return values.reduce((finalString, value, index) => {
        return `${finalString}${value}${strings[index+1]}`
    }, strings[0]);
}

const firstName = 'Joy';
const hobby = "video games";
console.log(custom`My name is ${firstName} and I love ${hobby}`);

/*
Returns "My name is Joy and I love video games"

strings -> ["My name is ", " and i love ", ""]
        --> holds everything but the template literals 
        including the empty end
        
reduce -> 
    1st pass:
    finalString = strings[0] = "My name is "
    value = "Joy"
    strings[1] = " and I love "
    returns finalString = "My name is Joy and I love"
    
    2nd pass: 
    finalString = "My name is Joy and I love "
    value = "video games"
    strings[2] = ""
    returns finalString = "My name is Joy and I love video games"

    Note: apparently string literals just concat when
    next to each other or the fact that it's returning a
    whole string. (Probably the latter)
*/