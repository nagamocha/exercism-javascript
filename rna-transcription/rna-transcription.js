//export

//try checking regex.test
export
function toRna(dna){
    function transcribe(n){
        if(n == 'G')return 'C';
        else if(n == 'C')return 'G';
        else if(n == 'T')return 'A';
        else if(n == 'A')return 'U';
        else{
            throw new Error('Invalid input DNA.')
        }
    }
    return dna.split('').map(transcribe).join('');
}


//module.exports = toRna;


































































































//end
