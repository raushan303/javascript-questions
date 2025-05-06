console.log("ES6 Class ================================================");

class Car {
  oil = 10;
  constructor() {
    this.speed = 10;
  }
  getSpeed() {
    return this.speed;
  }
  getOil = () => {
    return this.oil;
  };
  increaseSpeed = function () {
    this.speed += 10;
    return this.speed;
  };
}
const car = new Car();
console.log(car);
// you won't find getSpeed method on bmwCar instance

class BMW extends Car {
  constructor() {
    super(); // to call the parent constructor
    this.price = 8000;
  }
  getPrice = () => {
    return this.price;
  };
  getLife() {
    return 100;
  }
}

const bmwCar = new BMW();
console.log(bmwCar);
// you won't find getLife method on bmwCar instance
console.log(bmwCar.getPrice());
console.log(bmwCar.getSpeed());

// read below doc for full details
// https://docs.google.com/document/d/1H-FFGJYgBfW81sS0tJdZB5adwAaHrqdRpsZZxY-eF4U

// =================================================

class MyComponent {
  static myStaticMethod() {
    console.log(this); // class its self [class MyComponent] { val: 5 }
    console.log(this.val); // 5
    console.log(this.a); //undefined
    return this.val;
  }
  static val = 5;
  a = 10;
}

console.log(new MyComponent()); // MyComponent { a: 10 }
console.log(MyComponent); // [class MyComponent] { val: 5 }
console.log(MyComponent.val); // 5
console.log(MyComponent.myStaticMethod); // [Function: myStaticMethod]
console.log(MyComponent.myStaticMethod()); // 5
