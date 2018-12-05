const findBiggestWord = ( str ) => str.split(' ').sort(( a, b ) => a.length < b.length)[0];

console.log(findBiggestWord('boop bloomburg hello'));
console.log("==================================================");