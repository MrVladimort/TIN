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