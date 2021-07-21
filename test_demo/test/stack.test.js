class Stack{
    constructor() {
       this.top = -1;
       this.items = {}; 
    }

    // view top value of stack
    get peek() {
        return this.items[this.top];
    }

    push(value) {
        this.top += 1;
        this.items[this.top] = value;
    }

    get pop() {
        var value = this.items[this.top];
        // console.log(value);
        delete this.items[this.top];
        this.top -= 1;
        return value;
    }
}

describe('My Stack', () => {

    let stack;
    
    beforeEach(()=> {
        stack = new Stack();
    });

    it('is created empty', ()=> {

        expect(stack.top).toBe(-1);
        expect(stack.items).toEqual({});
    });

    test('can push to the top', ()=> {
        stack.push('🐹'); // "windowskey + ." to get emojis" 
        expect(stack.top).toBe(0);
        expect(stack.peek).toBe('🐹');
    });

    it('can pop off', ()=> {
        stack.push('🐹');
        stack.push('🦌');
        expect(stack.top).toBe(1);
        expect(stack.pop).toBe('🦌');
        expect(stack.pop).toBe('🐹');
        expect(stack.top).toBe(-1);
        expect(stack.items).toEqual({});
    });
})