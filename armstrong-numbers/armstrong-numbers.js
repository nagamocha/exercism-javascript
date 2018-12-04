//export
function validate(n){
    return n == n.toString().split('').reduce( (s, n) =>{return s + Math.pow(parseInt(n), n.toString().length);} , 0) ;
}
