const compareNumbers = (a, b) => a - b;

const amountToCoins = (amount, nominals) => {
    const sortedNominals = nominals.sort(compareNumbers).reverse();

    const neededNominals = [];
    let currentAmount = 0;

    while (currentAmount !== amount) {
        for (let i = 0; i < sortedNominals.length; i++) {
            const nominal = sortedNominals[i];
            if (!((nominal + currentAmount) > amount)) {
                neededNominals.push(nominal);
                currentAmount += nominal;
                break;
            }
        }
    }

    return neededNominals;
};

console.log(amountToCoins(48, [25, 10, 5, 2, 1]));
console.log("==================================================");