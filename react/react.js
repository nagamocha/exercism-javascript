



export
class InputCell{
    constructor(value){
        this.value = value;
        this.observers = [];
    }

    setValue(value){
        this.value = value;
        this.observers.forEach(c => c.update())
    }

    addObserver(cell){
        this.observers.push(cell)
    }

}



export class ComputeCell{
    constructor(cells, callback){
        cells.forEach( c => c.addObserver(this));

        this.value = callback(cells);
        this.cells = cells;
        this.mycallback = callback;
        this.observers = [];
        this.callbacks = []

    }

    update(){
        this.value = this.mycallback(this.cells)
        this.observers.forEach(c => c.update())
    }

    addObserver(cell){
        this.observers.push(cell)
    }

    addCallback(callback){
        this.callbacks.push(callback)
    }

}

export class CallbackCell{
    constructor(callback){
        this.callback = callback;
        this.values = []
    }
}
