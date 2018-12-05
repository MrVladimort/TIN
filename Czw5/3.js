function palindrome ( str ) {
    let re = /[\W_]/g;
    let lowRegStr = str.toLowerCase().replace(re, '');
    let reverseStr = lowRegStr.split('').reverse().join('');
    return reverseStr === lowRegStr;
}

console.log(palindrome("A man, a plan, a canal. Panama"));
console.log(palindrome("A man, a plan, a canal."));
console.log(palindrome("AbA"));
console.log("==================================================");