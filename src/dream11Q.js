// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const csv = `id,parentId,name
1,,A
2,1,B
3,2,C
4,3,D
5,2,E
6,,F
`;

const min = 1000 * 60;

const limit = (fn, limit) => {
  const calls = [];
  let timeoutId = null;
  let lastExecuted = 0;
  const delay = min / limit;
  console.log(delay, "delay");

  const call = function (curDelay) {
    timeoutId = setTimeout(() => {
      const args = calls.shift();
      console.log("in", args);
      fn.apply(this, [...args, lastExecuted - Date.now()]);
      lastExecuted = Date.now();
      if (calls.length) {
        timeoutId = call.apply(this, [delay]);
      } else {
        timeoutId = null;
      }
    }, curDelay);
  };

  return function (...args) {
    const now = Date.now();
    if (now > lastExecuted + delay) {
      fn.apply(this, [...args, 0]);
      lastExecuted = now;
    } else {
      calls.push(args);
      if (timeoutId) return;
      call.apply(this, [lastExecuted + delay - now]);
    }
  };
};

const obj = {
  name: "raushan",
};

const abc = function (p, t) {
  console.log("called", this, p, t);
};

const fn = limit(abc, 20);

fn.apply(obj, ["p1"]);
fn.apply(obj, ["p2"]);
fn.apply(obj, ["p3"]);
fn.apply(obj, ["p4"]);
fn.apply(obj, ["p5"]);
fn.apply(obj, ["p6"]);
fn.apply(obj, ["p7"]);
fn.apply(obj, ["p8"]);
fn.apply(obj, ["p9"]);
fn.apply(obj, ["p10"]);
fn.apply(obj, ["p11"]);
fn.apply(obj, ["p12"]);
fn.apply(obj, ["p13"]);
