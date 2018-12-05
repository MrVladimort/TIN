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