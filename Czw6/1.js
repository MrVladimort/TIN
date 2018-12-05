const compareNumbers = (a, b) => a - b;

const findSeconds = (arr) => {
    if (arr.length < 3) return null;

    const sortedArray = arr.sort(compareNumbers);

    return {
        secMax: sortedArray[sortedArray.length - 2],
        secLow: sortedArray[1],
    }
};

console.log(findSeconds([2, 4, 8, 1, 6, 7, 0, 1, 5, 0, 3]));
console.log("==================================================");