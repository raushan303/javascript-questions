// Shallow Comparison
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true; // They have the same reference
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false; // One of them is not an object
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false; // They have a different number of properties
  }

  for (const key of keysA) {
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
      return false; // Properties are not equal
    }
  }

  return true; // All checks passed; objects are shallowly equal
}

// Deep Comparison
function deepEqual(objA, objB) {
  if (objA === objB) {
    return true; // They have the same reference
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false; // One of them is not an object
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false; // They have a different number of properties
  }

  for (const key of keysA) {
    if (!objB.hasOwnProperty(key) || !deepEqual(objA[key], objB[key])) {
      return false; // Properties are not deeply equal
    }
  }

  return true; // All checks passed; objects are deeply equal
}

// Test cases
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = { a: 1, b: { c: 3 } };

console.log("Shallow Comparison:");
console.log(shallowEqual(obj1, obj2)); // false (shallowly equal)
console.log(shallowEqual(obj1, obj3)); // false (shallowly not equal)

console.log("Deep Comparison:");
console.log(deepEqual(obj1, obj2)); // true (deeply equal)
console.log(deepEqual(obj1, obj3)); // false (deeply not equal)

// ================================================================

/*
In JavaScript, when you use the equality operator (==) to compare two objects, 
it checks if the two objects reference the same object in memory, 
not if their contents are the same.

The == operator checks for equality after performing type coercion if the operands have different types.
Type coercion means that JavaScript will attempt to convert one or both operands to a common type before making the comparison.
For objects like objA and objB, the == operator will only return true if both objects reference the same object in memory.
It does not compare the contents of the objects.
*/

const objA = { a: "aa", b: "bb" };
const objB = { a: "aa", b: "bb" };
const objC = { ...objA };
const objD = objA;

console.log(objA == objB); // false
// objA and objB are two separate objects, even though they have the same properties and values.
// Therefore, objA == objB will evaluate to false.
console.log(objA === objB); // false

console.log(objA == objC); // false
// same as above
console.log(objA === objC); // false

console.log(objA == objD); // true
console.log(objA === objD); // true

console.log(JSON.stringify(objA) === JSON.stringify(objB)); // This will be true

// ===============================================================

const arrA = [1, 2, 3, 4];
const arrB = [1, 2, 3, 4];
const arrC = [...arrA];
const arrD = arrA;

console.log(arrA == arrB); // false
// same as object
console.log(arrA === arrB); // false

console.log(arrA == arrC); // false
console.log(arrA === arrC); // false

console.log(arrA == arrD); // true
console.log(arrA === arrD); // true

// ======================================================================

const str1 = "1";
const num1 = 1;
const str2 = "1.5";
const num2 = 1.5;

console.log(str1 == num1); // true
console.log(str1 === num1); // false

console.log(str2 == num1); // false
console.log(str2 === num1); // false

console.log(str2 == num2); // true
console.log(str2 === num2); // false

// ===================================================================

const func1 = function () {};
const func2 = function () {};
const func3 = func1;

console.log(func1 == func2); // false
console.log(func1 === func2); // false

console.log(func1 == func3); // true
console.log(func1 === func3); // true

///////////////////////////////////////////////////////////////////////

const objj = {
  a: [1, 2],
  b: [3],
  c: [4],
};
const objjCopy = { ...objj };

console.log(objj === objjCopy); // false
console.log(objj.a === objjCopy.a); // true
