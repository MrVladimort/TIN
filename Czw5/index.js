function silniaDeclaration ( myNumber ) {
    if (myNumber < 2) return 1;

    let factorialNumber = 1;
    for (let i = myNumber; i > 1; i--) {
        factorialNumber = factorialNumber * i;
    }

    return factorialNumber;
}

const silniaExpression = ( myNumber ) => myNumber < 2 ? 1 : myNumber * silniaExpression(myNumber - 1);

console.log(silniaExpression(5));
console.log(silniaDeclaration(5));
console.log("==================================================");

const fib = ( n ) => n < 2 ? n :  fib(n - 1) + fib(n - 2);

console.log(fib(10));
console.log("==================================================");

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

const toAlphabetOrder = ( str ) => str.split('').sort().join('');

console.log(toAlphabetOrder("bcad"));
console.log("==================================================");

const findBiggestWord = ( str ) => str.split(' ').sort(( a, b ) => a.length < b.length)[0];

console.log(findBiggestWord('boop bloomburg hello'));
console.log("==================================================");

function isPrime ( num ) {
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num !== 1 && num !== 0;
}

console.log(isPrime(2));
console.log(isPrime(3));
console.log(isPrime(4));
console.log(isPrime(5));
console.log("==================================================");

const returnType = obj => typeof obj;

console.log(returnType(' '));
console.log(returnType(1));
console.log(returnType({}));
console.log("==================================================");
