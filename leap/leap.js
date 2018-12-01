export const isLeap = (yr) => {
    if (yr % 4 == 0 ){
        if (yr % 100 == 0 && yr % 400 != 0) return false
        else return true
    }else{
        return false
    }

}
