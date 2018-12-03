



export
class InputCell{
    constructor(value){
        this.value = value;
    }

    setValue(value){
        this.value = value;
    }

}



export class ComputeCell{
    constructor(cells, compute){
        this.cells = cells
        this.compute = compute
    }

    get value(){
        return this.compute(this.cells)
    }

    addCallback(callback){
        this.callbacks.push({callback: })
    }

    getState(){

    }

}

export class CallbackCell{
    constructor(callback){
        this.callback = callback;
        this.values = []
        this.holderCell = null;//cell that will call callback
    }

    get values(){

    }
}
