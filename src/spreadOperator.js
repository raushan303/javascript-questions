console.log("spread operator ================================================");

const str = "abcdef";
const str2 = [...str];
console.log(str2); // ["a", "b", "c", "d", "e", "f"];

const objj = {
  a: [1, 2],
  b: [3],
  c: [4]
};
const objjCopy = { ...objj };
console.log(objjCopy); // { a: [ 1, 2 ], b: [ 3 ], c: [ 4 ] }

const arr = [1, 2, 3, 4];
const arr2 = [...arr];
console.log(arr2); // [1, 2, 3, 4]

// ===================================

const tmpArr = [1, 2, "ab", { c: 1 }];
const objFromArr = { ...tmpArr };
console.log(objFromArr); // { '0': 1, '1': 2, '2': 'ab', '3': { c: 1 } }

const tmpObj = { a: 1, b: 2 };
const arrFromObj = [...tmpObj]; // TypeError: tmpObj is not iterable

// ================================================================

const [first, ...rest] = arr;
console.log(first, rest); // 1, [2, 3, 4]

const oneArr = [1];
const [f, s = 2] = oneArr;
console.log(f, s); // 1 2

const obj = {
  prop1: 1,
  prop2: 2,
  prop3: 3,
  prop5: {
    data: "abc"
  }
};
const {
  prop1,
  prop4: { data }
} = obj;
console.log(prop1, data); // Cannot read properties of undefined (reading 'data')

// const {prop1, prop4: {data} = {data:2}} = obj;
// console.log(prop1, data); // 1, 2

const { prop1: rProp1 } = obj;
console.log(rProp1); // 1

const {
  prop5: { data: data2 }
} = obj;
console.log(data2); // abc
