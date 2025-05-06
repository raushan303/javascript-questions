console.log("polyfill ================================================");

/*
 IMP: don't use arrow function to create polyfill, 
 because `this` inside arrow function will not be pointing to function on which polyfill was called
*/

/*
Function.prototype.myApply = function (...args){
  const [context, argsArray=[]] = args;
  const func = this; // in arrow function u can't get function using this

  // without using inbuilt call or bind
  // since object method points to object itsself, so assigning func to object method
  // so when fun is called as object method it'll point to object method
  context.__temp__ = func;
  const result = context.__temp__(...argsArray);
  delete context.__temp__;

  // another approach using inbuilt call
  // func.call(context, ...argsArray);

  return result;
};

function test(){
    console.log(this)
}
const obj = {
    a:1,
    b:2,
    c:[1,2,3],
    d: {e:4}
}
test.myApply(obj);

// =================================================================

Function.prototype.myBind = function (...args){
  const [context, ...argsArray] = args;
  const func = this;
  
  return (...args) => {
      return func.apply(context, [...argsArray, ...args])
  }
};

function test(...args){
    console.log(this) // { a: 1, b: 2, c: [ 1, 2, 3 ], d: { e: 4 } }
    console.log(args) // [ 'hi', 2, 'hello', 'ok' ]
}

const obj2 = {
    a:1,
    b:2,
    c:[1,2,3],
    d: {e:4}
}

test.myBind(obj2, "hi", 2)("hello", "ok");

// ========================================================================


// Check if the Promise object already exists, if not, create it
if (!window.Promise) {
  window.Promise = function (executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.handlers.forEach((handler) => handler.onFulfilled(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.handlers.forEach((handler) => handler.onRejected(reason));
      }
    };

    this.then = (onFulfilled, onRejected) => {
      return new Promise((resolve, reject) => {
        const handle = {
          onFulfilled: (value) => {
            try {
              if (typeof onFulfilled === 'function') {
                resolve(onFulfilled(value));
              } else {
                resolve(value);
              }
            } catch (error) {
              reject(error);
            }
          },
          onRejected: (reason) => {
            try {
              if (typeof onRejected === 'function') {
                resolve(onRejected(reason));
              } else {
                reject(reason);
              }
            } catch (error) {
              reject(error);
            }
          },
        };
        if (this.state === 'pending') {
          this.handlers.push(handle);
        } else if (this.state === 'fulfilled') {
          handle.onFulfilled(this.value);
        } else if (this.state === 'rejected') {
          handle.onRejected(this.value);
        }
      });
    };

    executor(resolve, reject);
  };
}



if (!Promise.all) {
  Promise.all = function(promises) {
    return new Promise(function(resolve, reject) {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var results = [];
      var completed = 0;

      promises.forEach(function(promise, index) {
        Promise.resolve(promise)
          .then(function(result) {
            results[index] = result;
            completed++;

            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch(function(error) {
            reject(error);
          });
      });

      if (promises.length === 0) {
        resolve(results);
      }
    });
  };
}

// Usage example
var promise1 = Promise.resolve(1);
var promise2 = Promise.resolve(2);
var promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(function(values) {
    console.log(values); // [1, 2, 3]
  })
  .catch(function(error) {
    console.error(error);
  });






















*/
