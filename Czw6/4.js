const obj = {
    a: 'foo', b: 42, c: {},
    funA: () => null, funB: () => ({}), funC: () => 123,
};

const checkObj = (obj) => Object.keys(obj).forEach((key) => console.log(`${key} type of ${typeof obj[key]}`));

checkObj(obj);
console.log("==================================================");