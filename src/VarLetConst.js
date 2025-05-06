var value = 10;
function test() {
  console.log(value); // undefined
  // here we are not accessing global variable instead accessing local value
  // local value is hoisted but value is not assigned
  var value = 20;

  console.log(value); // 20
}
test();

// ====================================

/*
// you can create function with same name, and it'll be overwritten
// but here code is running in strict-mode, so can't create func with same name   
function test() {
  a = 40;
  // this is created in global scope
  console.log(a); // 40
}
test();
console.log(a); // 40
*/

// ====================================

var x = 10;
console.log(x); // 10
var x = 20;
console.log(x); // 20

// ====================================

var y = 30;
{
  let y = 50;
  console.log(y); // 50
}
console.log(y); // 30

// ====================================

/*
let z = 30;
{
  var z = 50; // error
  // will get error because var is functional scope
  // so let z and var z in same scope, which is not allowed
  console.log(z);
}
console.log(z);
*/

// ====================================

function testParam(a) {
  console.log(a, "first"); // 10 first
  var a = 15; // you can redeclare with var
  console.log(a, "second"); // 15 second
  // let a = 16;
  // you can't redeclare let in same scope
}

testParam(10);

// ====================================

var hoisting = 100;
function hoisting() {
  console.log("I m from hoisting function !!!");
}
console.log(hoisting);

/////////////////////////////////////////////////////

function abc() {
  v = 40;
}
abc();
console.log(v); // 40

/*
v = 40; without any var, let or const created in global scope
*/
