//export
class NumStream{
    constructor(){
        this.stream = []
    }
    push(n){this.stream.push(n)}

    pop(){
        if (this.stream.length == 0) return 1;
        else{
            let n = parseInt(this.stream.join(''));
            this.stream = [];
            return n;
        }
    }
}


export
function decode(ct){
    let numStream = new NumStream();
    let isNum = (c) => {return '0123456789'.indexOf(c) !== -1;}
    let pt = '';
    for(let c of ct){
        if(isNum(c)) numStream.push(c);
        else{
            pt += c.repeat(numStream.pop())
        }
    }
    return pt;


}

export
function encode(pt){
    let ct_arr = [[NaN, NaN]];
    let i = 0;
    const count = 0, char = 1;

    for(let p of pt){
        if(p == ct_arr[i][char]) ct_arr[i][count]++;
        else{
            i++;
            ct_arr[i] = [1, p];
        }
    }

    let ct = '';
    ct_arr.slice(1).forEach(c => {
        if(c[count] == 1) ct += c[char];
        else{
            ct += c.join('');
        }
    })
    return ct;
}
