export const reverseString  = (str) =>{
    let rev = '';
    for (let c of str){
        rev = c + rev;
    }
    return rev;
}
