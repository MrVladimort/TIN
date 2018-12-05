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

const binarySearch = (target, arr) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;

        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
};


console.log(binarySearch(6, [-1, 0, 4, 5, 6 , 9]));
console.log("==================================================");

const obj = {
    a: 'foo', b: 42, c: {},
    funA: () => null, funB: () => ({}), funC: () => 123,
};

const checkObj = (obj) => Object.keys(obj).forEach((key) => console.log(`${key} type of ${typeof obj[key]}`));

checkObj(obj);
console.log("==================================================");

const arrSum = arr => arr.reduce((a, b) => a + b, 0);
const arrAvg = arr => arrSum(arr) / arr.length;

function Student({imie, nazwisko, nrIndeksu, tablicaOcen}) {
    this.imie = imie;
    this.nazwisko = nazwisko;
    this.tablicaOcen = tablicaOcen;
    this.nrIndeksu = nrIndeksu;

    this.wpiszImie = (imie) => {
        this.imie = imie;
    };

    this.wpiszNazwisko = (nazwisko) => {
        this.nazwisko = nazwisko;
    };

    this.obliczSredniaArr = () => {
        return arrAvg(this.tablicaOcen);
    };

    this.wpiszSrednia = (srednia) => {
        this.srednia = srednia;
    };

    this.toString = () => {
        return `${this.imie} ${this.nazwisko} ${this.obliczSredniaArr()}`;
    };
}

const student = new Student({imie: "Vova", nazwisko: "Karp", nrIndeksu: 15118, tablicaOcen: [3, 4, 5, 4, 3]});
console.log(student.toString());
console.log("==================================================");

const studentProtoInit = Student.prototype = {
    listaPrzedmiotow: []
};

Student.prototype.listaPrzedmiotow = ['AVC', 'TUR', 'GRK'];

console.log(studentProtoInit);

// TODO Object.create()

console.log(studentProtoInit);
