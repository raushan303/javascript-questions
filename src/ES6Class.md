class Car{
oil = 10;
constructor(){
this.speed = 10;
}
getSpeed(){
return this.speed;
}
getOil = () => {
return this.oil;
}
increaseSpeed = function(){
this.speed += 10;
return this.speed;
}
}
const car = new Car();

In JavaScript, when you define a class and its methods using the ES6 class syntax, such as in your example, the methods are added to the prototype of the class, not directly to the instances of the class. This is why you can access the `getSpeed` method on instances of the class, even though it's not present as a property on the instance itself.

When you access a property or method on an object in JavaScript, the JavaScript engine first checks if the property or method exists on the object itself. If it doesn't find it, it looks up the prototype chain to find it on the class's prototype (or its parent class's prototype).

console.log(Car.prototype.getSpeed)

This behavior is part of JavaScript's prototype-based inheritance system, which allows methods and properties to be shared among instances of a class without duplicating them for each instance.

Arrow functions or function with `function` keyword behave differently from traditional function declarations within classes. They are attached directly to the instance and do not go through the prototype chain.

So in above code `oil`, `speed`, `getOil`, `increaseSpeed` these properties and methods are available on instance of the class where in `getSpeed` is available on prototypes of the class

Car.prototype.someProperty = 'This is a property on the class prototype.';
// this way you can define properties on class prototype

---

Inheritance

---

class BMW extends Car {
constructor() {
super(); // to call the parent constructor
this.price = 8000;
}
getPrice = () => {
return this.price;
};
getLife(){
return 100;
}
}

---

super()

---

When you define a constructor in a child class that extends a parent class, JavaScript requires you to call super() before acessing `this` or returning from derived constructor within the child class's constructor. This is necessary because it initializes the parent class and sets up the context for the child class. If you don't define a constructor in the child class, JavaScript automatically inserts a default constructor for you. This default constructor implicitly includes a call to super(), which means it calls the parent class's constructor.

This behavior ensures that the parent class is properly initialized when you create instances of the child class, whether you define a constructor in the child class or not.

Any subclass inherited from parent class, will have all the properties and method present on child class and parent class attached to instance of the class.

for example BMW will have `oil`, `speed`, `getOil`, `increaseSpeed`, `getPrice`, `price` these properties and methods are available on instance of the class, and `getLife` is added to prototype of BMW class

console.log(BMW.prototype.getSpeed)
getSpeed will be on prototype of BMW as well

---

Order

---

class Car{
oil = 10;
constructor(){
this.speed = 10;
this.oil = 30;
this.increaseSpeed = function(){
this.speed += 10;
return this.speed;
}
}
getSpeed(){
return this.speed;
}
getOil = () => {
return this.oil;
}
increaseSpeed = function(){
this.speed += 10;
return this.speed;
}
}

when you define properties and method in class first properties and method define on class its self get assigned then properties and method inside constructor gets initialized

so in above code `speed` will be initialized, and `oil`, `increaseSpeed` will be reassigned with updated code

---

class Parent {
someMethod() {
console.log('Parent class method');
}
someMethod2 = () => {
console.log('Parent class method2');
}
}

class Child extends Parent {
someMethod() {
super.someMethod(); // Calling the parent class's method
super.someMethod2(); // this will give an error
}
}

const child = new Child();
child.someMethod();


This error occurs because of the difference in how the two methods are defined in the Parent class. Let me explain why super.someMethod2() fails while super.someMethod() works.

The key distinction is in how these methods are defined:
someMethod() is defined as a prototype method using the standard method syntax.
someMethod2 = () => {} is defined as a class field with an arrow function.

When you use the arrow function syntax with a class field, the method is not added to the prototype chain, but instead becomes an instance property initialized during construction. This means:
someMethod is on the Parent.prototype, so it's accessible via super
someMethod2 is not on the prototype - it's an instance property of each Parent object, so it's not accessible via super


You can fix this in a few ways:

Option 1: Change someMethod2 to a regular method

Option 2: Access the parent's instance property directly

class Child extends Parent {
    someMethod() {
        super.someMethod();
        // Access the property on the parent instance (this)
        this.someMethod2();
    }
}

The main thing to understand is that super refers to the prototype chain of the parent class, but class fields with arrow functions create instance properties, not prototype methods.
