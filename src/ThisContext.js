console.log("this context ================================================");

let obj = {
  name: "Raj",
  greet: function () {
    console.log(`hello, ${this.name}`);
    makeGreet();
    function makeGreet() {
      console.log(`hello, ${this?.name}`);
      // here `this` is pointing to global this
    }
  },
};
obj.greet();

// ====================================================

const arrowFunc = (withV) => {
  console.log(this, "checking this with", withV);
};

const obj2 = {
  a: 1,
  b: 2,
};

arrowFunc.call(obj2, "call");
arrowFunc.apply(obj2, ["apply"]);
arrowFunc.bind(obj2)("bind");

/*
// below output from online compiler

{} checking this with call
{} checking this with apply
{} checking this with bind

this inside arrow function points to the this of enviorment it's present in.
not this of passed obj
*/

///////////////////////

const namedFunc = function (withV) {
  console.log(this, "checking this with", withV);
  this.c = 40;
};

console.log(obj2);

namedFunc.call(obj2, "call");
namedFunc.apply(obj2, ["apply"]);
namedFunc.bind(obj2)("bind");

console.log(obj2);

/*
{ a: 1, b: 2 } checking this with call
{ a: 1, b: 2, c: 40 } checking this with apply
{ a: 1, b: 2, c: 40 } checking this with bind
{ a: 1, b: 2, c: 40 }
*/

///////////////////////

function func(withV) {
  console.log(this, "checking this with", withV);
  this.d = 60;
}

console.log(obj2);

func.call(obj2, "call");
func.apply(obj2, ["apply"]);
func.bind(obj2)("bind");

console.log(obj2);

/*
{ a: 1, b: 2, c: 40 } checking this with call
{ a: 1, b: 2, c: 40, d: 60 } checking this with apply
{ a: 1, b: 2, c: 40, d: 60 } checking this with bind
{ a: 1, b: 2, c: 40, d: 60 }
*/

// ====================================================

function f1() {
  console.log(this, "f1"); // obj3
  const f2 = () => {
    console.log(this, "f2"); // obj3
    function f4() {
      console.log(this, "f4"); // global this
    }
    f4();
  };
  f2();
  function f3() {
    console.log(this, "f3"); // global this
  }
  f3();
}

const obj3 = {
  a: "60",
};

f1.call(obj3);

// ===========================================================

/*
function Rect(l, b) {
  this.length = l;
  this.breadth = b;
  this.area = function () {
    console.log(this, "area"); // rect `this`
    function func() {
      console.log(this, "func"); // global `this`
      const arrow = () => {
        console.log(this, "arrow"); // global `this`
      };
      arrow();
    }
    func();
  };
  area2 = () => {
    // this area2 var will be created in global env
    console.log(this); // rect `this`
  };
}

Rect.prototype.area1 = function () {
  console.log(this); // rect `this`
};

Rect.prototype.area2 = () => {
  console.log(this); // global `this`
};

let rect = new Rect(2, 5);
rect.area();
rect.area1();
rect.area2();
area2();
*/

function abc() {
  v = 40;
}
abc();
console.log(v); // 40

/*
v = 40; without any var, let or const created in global scope
*/
