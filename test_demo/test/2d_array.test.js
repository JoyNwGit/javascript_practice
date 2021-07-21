class Queue {
    constructor(){
        this.items = [];
    }

    /**
     * Adds a value to the queue
     * @param {*} value The value to be added to the end of the queue
     */
    enqueue(value){
        this.items.push(value);
    }

    /**
     * Returns the first item in the queue
     * @param {} none
     */
    get dequeue() {
        return this.items.shift();
    }

    //flavor
    get isEmpty() {
        return this.items.length == 0;
    }

    get toString() {
        return this.items.toString();
    }

    /**
     * 
     */
    get peek() {
        return !this.isEmpty ? this.items[0] : undefined;
    }

    get poke() {
        return !this.isEmpty ? this.items[this.items.length-1] : undefined;
    }
}



describe('2D Array', () => {
    let array;
    let queue;
    let position;
    let len;

    beforeEach(()=> {
        array = 
        [          // 0  1  2
        /** 0  */    [1, 1, 0],
        /** 1  */    [1, 1, 1],
        /** 2  */    [1, 0, 9]
        ]
        array2 = 
        [          // 0  1  2
        /** 0  */    [1, 1, 0],
        /** 1  */    [0, 1, 0],
        /** 2  */    [9, 1, 0]
        ]


        queue = new Queue();

        position = array[0][0];
        len = array.length;

    })

    it('can properly queue a 2d array', ()=>{
        for (let row = 0; row < len; row++ )
        {
            for (let col = 0; col < len; col++)
            {
                queue.enqueue(array[row][col]);
            }
        }

        // console.log(queue.toString);
        expect(queue.dequeue).toBe(1);
        expect(queue.dequeue).toBe(1);
        expect(queue.dequeue).toBe(0);
        expect(queue.dequeue).toBe(1);
        // console.log(queue.toString);
    });

    it('can get the items to the right and bottom of the current position in a 2d array', ()=>{
        var row = 0;
        var col = 0;
        queue.enqueue(position);
        queue.enqueue(array[row][col+1]); // Add right
        queue.enqueue(array[row+1][col]); // add down
        expect(queue.dequeue).toBe(1);
        expect(queue.dequeue).toBe(1);
        expect(queue.dequeue).toBe(1);

    })

    it('can find a path through regular traversal', ()=> {
        let numLevels = -1;
        var row = 0;
        var col = 0;
        //enqueue right
        //enque down 
        //numLevels++
        //position is now right
        // enqueu right
        // enqueue down
        // position is now down 
        // enqueu right
        // enqueue down
        // numLevels++
        // repeat

        traverse = (row, col) => {
            position = array[row][col];
            if (position == 9)
            {
                // console.log("Found the exit");
                numLevels = row+col;
                return;
            }
            else if (position == 1)
            {
                // console.log("At valid position (" + row + ", " + col + ")");
                array[row][col] = 12;

                if (col < len-1) {
                    traverse(row, col+1)
                }
                if (row < len-1) {
                    traverse(row+1, col);
                }
                // go back left
                if (col > 0) {
                    traverse(row, col-1)
                }
                // go back up 
                if (row > 0) {
                    traverse(row-1, col);
                }
                return;
            }
        }

        traverse(row, col);
        expect(numLevels).toBe(4);
    })

    test("can find a path via breadth first search", ()=> {
        var row, col;
        row = col = 0;
        var vis = Array.from(Array(len), ()=> Array(len).fill(false));
        let numLevels = -1;
        numLevels = solve(array2, vis, queue, row, col)
        expect(numLevels).toBe(-1);
    })
})

function solve(array, vis, queue, row, col) {

        //direction vectors - north south east west
        // but can only move right (east) or down (south)
        let dr = [0, +1, 0, 0];
        let dc = [0, 0, +1, 0];
        var numLevels = -1;
        var position;
        console.log("-------------- Solving -------------");
        queue.enqueue([row, col]);
        vis[row][col] = true;

        while (!queue.isEmpty)
        {
            position = queue.peek;
            row = position[0];
            col = position[1];
            // console.log(array[row][col] + " ");
            if (array[row][col] == 9)
            {
                numLevels = row+col;
                console.log("Found the exit!")
                break;
            }
            queue.dequeue;

            // go to adjacent cells
            for (var i = 0; i < 4; i++ )
            {
                var adjrow = row + dr[i];
                var adjcol = col + dc[i];
                // adjacent space hasn't been visited and not out of bounds
                if (isValid(vis, array2, adjrow, adjcol))
                {
                    console.log("Found a valid adjacent space at: (" + adjrow + ", " + adjcol + ")")
                    queue.enqueue([adjrow, adjcol]);
                    vis[adjrow][adjcol] = true;
                }
            }
        }
    return numLevels;
}

function isValid(vis, array2, row, col)
{
    let len = vis.length;
    if (row < 0 || col < 0
        || row >=len || col >= len)
        return false;

    if (vis[row][col])
        return false;

    if (array2[row][col] == 0)
        return false;

    return true;
}

// npm run test - see the package.json for other run commands