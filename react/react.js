



export
class InputCell{
    constructor(value){
        this.value = value;
        this.subscribers = new Set()
    }

    setValue(value){
        this.value = value;
        this.subscribers.forEach( cell => cell.notify(this))
    }

    addSubscriber(cell){
        this.subscribers.add(cell)
    }
}



export
class ComputeCell{
    constructor(cells, compute){
        this.cells = cells;
        this.compute = compute
        this.curr = this.compute(cells)
        this.cache = cells.map(cell => {value: cell.value, cell: cell});
        for (let cell of cells){
            this.cache 
        }
        this.cells = cells;
        this.subscribers = new Set()
    }

    get value(){
        return this.curr
    }

    probe(cell){
        if (cell.value != cache[cell]){
            cache[cell] = cell.value
            return [true, newVal]
        }else{
            return [false, null]
        }
    }

    notify(from){
        //before updating value, probe other dependencies to check if they have changed too
        thi

        //if they have changed
        this.curr = this.compute(this.cells)

        //check if my value changes, if not, no need to notify subscribers
        this.subscribers.forEach(cell => cell.notify(this))
    }

    addSubscriber(cell){
        this.subscribers.add(cell)
    }
}

export
class CallbackCell{

}
