const arr = [4, 3, [6, 7], 1, 9, [21, [32, 12], [23]]]; //32

function max(a, b) {
  return a > b ? a : b;
}

function getMax(arr) {
  if (Array.isArray(arr)) {
    let mx = 0;
    arr.forEach((val) => {
      mx = max(mx, getMax(val));
    });
    return mx;
  }
  return arr;
}
console.log(getMax(arr)); // 32

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    console.log("hi new register");
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

let cnt = 10;
const fn = () => {
  console.log("this is called --------------------");
};

const optimizedFn = debounce(fn, 500);

let timer = 0;

while (cnt--) {
  setTimeout(() => {
    optimizedFn();
    optimizedFn();
    optimizedFn();
  }, timer);
  timer += 600;
}

let count = 0;

const getData = () =>
  new Promise((resolve, reject) => {
    if (count === 10) {
      resolve({
        status: "success",
        data: "it successfull"
      });
    } else {
      reject({
        status: "failed",
        error: "error"
      });
    }
    count++;
  });

const getResult = (fn, delay) => {
  return new Promise((resolve) => {
    fn()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        setTimeout(() => {
          resolve(getResult(fn, delay));
        }, delay);
      });
  });
};

getResult(getData, 0).then((result) => {
  console.log(result, "res");
});
