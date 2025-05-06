console.log("Object ================================================");

// ways to check if property exist on object
const obj = { name: "John", age: 30 };
if ("name" in obj) {
  console.log("name property exists in obj");
}

if (obj.hasOwnProperty("name")) {
  console.log("name property exists in obj");
}

if (obj.name !== undefined) {
  console.log("name property exists in obj");
}

if (obj.person?.name !== undefined) {
  console.log("name property exists in obj.person");
}

// ===============================================================

// ways to create object
const person1 = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};
console.log(person1);

function Person2(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}
const person2Obj = new Person2("John", "Doe", 30);
console.log(person2Obj);

const personPrototype = {
  greet: function () {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}.`);
  }
};
const person3 = Object.create(personPrototype);
person3.firstName = "John";
person3.lastName = "Doe";

class Person4 {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}
const personClassObj = new Person4("John", "Doe", 30);
console.log(personClassObj);

function createPerson(firstName, lastName, age) {
  return {
    firstName,
    lastName,
    age
  };
}
const createPersonObj = createPerson("John", "Doe", 30);
console.log(createPersonObj);

const singletonObject = {
  property1: "value1",
  property2: "value2"
};
console.log(singletonObject);
