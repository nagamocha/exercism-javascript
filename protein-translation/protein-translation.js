export
function translate(rna){
    //split to chunks
    //credits u/vivin paliath: https://stackoverflow.com/questions/7033639/split-large-string-in-n-size-chunks-in-javascript
    if(rna){
        let codons = rna.match(/.{1,3}/g);
        let proteins = codons.map(c => table[c]);
        let stop = proteins.indexOf("STOP");

        if(stop == -1) return proteins;
        else return proteins.splice(0, stop)

    }else{
        return [];
    }
}

const table = {
    "AUG": "Methionine",

    "UUU": "Phenylalanine",
    "UUC": "Phenylalanine",

    "UUA": "Leucine",
    "UUG": "Leucine",

    "UCU": "Serine",
    "UCC": "Serine",
    "UCA": "Serine",
    "UCG": "Serine",

    "UAU": "Tyrosine",
    "UAC": "Tyrosine",

    "UGU": "Cysteine",
    "UGC": "Cysteine",

    "UGG": "Tryptophan",

    "UAA": "STOP",
    "UAG": "STOP",
    "UGA": "STOP"
}
console.log(translate('AUGUUUUCUUAAAUG'));
