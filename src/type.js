const str = "abc";
const num1 = 1;
const num2 = 1.5;
const arr = [1, 2, "a"];
const obj = {
  a: 1,
  b: 2
};
const func = function () {};
const un = undefined;
const nullV = null;
const nan = NaN;
const inf1 = -Infinity; // -1/0
const inf2 = Infinity; // 1/0

console.log(typeof str); // string
console.log(typeof num1); // number
console.log(typeof num2); // number
console.log(typeof arr); // object
console.log(typeof obj); // object
console.log(typeof func); // function
console.log(typeof un); // undefined
console.log(typeof nullV); // object
console.log(typeof nan); // number
console.log(typeof inf1); // number
console.log(typeof inf2); // number
