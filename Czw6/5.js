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