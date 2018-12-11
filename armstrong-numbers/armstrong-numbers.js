export
function validate(num){
    return num.toString().split('').reduce((s,n) =>{return s + Math.pow( parseInt(n),num.toString().split('').length );},0 ) === num;
}
