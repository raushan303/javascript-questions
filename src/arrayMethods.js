const arr = [1, 2, 3, 4, 5];
arr.forEach((val) => {
  if (val === 2) {
    break;
    // continue;
    //  Illegal break, continue statement;
  }
});

const numbersArr1 = [1, 2, 3, 4, 5];
const hasEvenNumber = numbersArr1.some((number) => number % 2 === 0);
const numbersArr2 = [2, 4, 6, 8, 10];
const allEvenNumbers = numbersArr2.every((number) => number % 2 === 0);

const a = [1, 2, 3];
a.prop = "property";
a.push(6);
a[12] = 8;

console.log(a); // [ 1, 2, 3, 6, <8 empty items>, 8, prop: 'property' ]
console.log(a["prop"], a.prop); // property property
console.log("a7 ---->", a[7]); // a7 ----> undefined
a[9] = 9;

console.log(a); // [ 1, 2, 3, 6, <5 empty items>, 9, <2 empty items>, 8, prop: 'property']
console.log("a length ---->", a.length); // a length ----> 13
console.log();

a.forEach((v, index) => console.log(index, v));
/* 
0 1
1 2
2 3
3 6
9 9
12 8
*/
console.log();

for (let i = 0; i < a.length; i++) {
  console.log(i, a[i]);
}
/*
0 1
1 2
2 3
3 6
4 undefined
5 undefined
6 undefined
7 undefined
8 undefined
9 9
10 undefined
11 undefined
12 8
*/
console.log("");

for (let index in a) {
  console.log(index, a[index]);
}
/*
0 1
1 2
2 3
3 6
9 9
12 8
prop property
*/
console.log("");

for (let value of a) {
  console.log(value);
}
/*
1
2
3
6
undefined
undefined
undefined
undefined
undefined
9
undefined
undefined
8
*/
