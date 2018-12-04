export
function solve(x,y){
    //calculate distance from origin
    let dist = (x*x) + (y*y);
    if(dist > 100) return 0;
    else if (dist > 25) return 1
    else if (dist > 1) return 5
    else if (dist >= 0) return 10;
    else return null;
}
