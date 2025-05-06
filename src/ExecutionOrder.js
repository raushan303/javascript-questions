console.log("Execution order ================================================");

/*
let a = true;

setTimeout(()=> {
  a = false;
}, 2000)

while(a) {
  console.log('Logging from while')
}
*/

/* 
  How many times will this get printed / for how long will it get printed?

  above code will run infinitely as while is running in main thread and it will block main thread
  so setTimeout will always be waiting inside callback queue
*/

// ====================================================

/*
const myFunction = () => {
  let a = true;
  let b = 0;

  setTimeout(() => {
    a = false;
  }, 2000);

  setInterval(() => {
    if (a) {
      console.log(b++);
    }
  }, 200);
  // we should clear setInterval here

  console.log("inside myFunction");
};
myFunction();
console.log("Outside myFunction");
*/

/* 
 inside, outside, 0,1.... 8 or 9, mostly till 8
 but some browser can execute it till 9 as well 
*/

// =====================================================

/*
console.log(2)
while(true) {
	setTimeout(() => {
		console.log(4);
	}, 0)
}
console.log(3)
  
const newPromise = Promise.resolve();
newPromise.then(() => console.log(5))
*/

/*
  2
  above code again will keep adding setTimeout
  which will cause memory full
*/

// =========================================================

/*
console.log(2);
let cnt = 100;
while (cnt--) {
  console.log(cnt);
  setTimeout(() => {
    console.log(4);
  }, 0);
}
console.log(3);
*/

/*
  in above code first 100 times setTimeOut will be added,
  and every setTimeout after 0s will be waiting in callback queue
  untill while loop is completely executed 

  2
  99, 98, 97 ..... 0
  3
  4, 4, 4 ......
*/

// ==============================================================

/*
console.log(1);

const promise = new Promise((res) => {
  res();
});

promise.then(() => {
  setTimeout(() => console.log(2), 2000);
  console.log(3);
});

setTimeout(() => console.log(4), 0);

console.log(5);

setTimeout(() => {
  console.log(6);
}, 1000);
*/

/*
  1, 5, 3, 4, 6, 2
*/

// ===============================================

/*
console.log(1);

const promise = new Promise((res) => {
  console.log(7)
  res();
  console.log(8)
});

promise.then(() => {
  setTimeout(() => console.log(2), 2000);
  console.log(3);
});

setTimeout(() => console.log(4), 0);

console.log(5);

setTimeout(() => {
  console.log(6);
}, 1000);
*/

/*
  1, 7, 8, 5, 3, 4, 6, 2
*/

// ============================================

setTimeout(() => {
  console.log("1");
}, 1000);

new Promise((resolve) => {
  setTimeout(() => {
    resolve("4");
  }, 1000);
}).then((res) => {
  console.log(res);
});

// 1, 4
// above, both is setTimeout so both will go to callback queue, and run one after another
// once second setTimeout is executed and resolve('4') is called then
// .then callback (res) => {console.log(res);} will go to microtask queue
// so don't mix setTimeout with microTask queue

setTimeout(() => {
  console.log("1");
}, 0);

new Promise((resolve) => {
  resolve("4");
}).then((res) => {
  console.log(res);
});

// 4, 1

// ===============================================

console.log(1);

const res = Promise.resolve(2);
console.log(res);
res.then((val) => {
  console.log(val);
});

console.log(3);

// 1, Promise { 2 }, 3, 2
