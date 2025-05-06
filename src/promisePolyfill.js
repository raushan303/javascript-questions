function MyPromise(callBack) {
  const callBackList = [];

  const resolve = (data) => {
    let res = data;
    let hasError = false;
    callBackList.forEach((obj) => {
      if (hasError && obj.type === "then") return;
      if (!hasError && obj.type === "catch") return;
      try {
        res = obj.cb(res);
        hasError = false;
      } catch (err) {
        hasError = true;
        res = err;
      }
    });
    if (hasError) {
      throw new Error(res);
    } else {
      return res;
    }
  };

  const reject = (data) => {
    let res = data;
    let hasError = true;
    callBackList.forEach((obj) => {
      if (hasError && obj.type === "then") return;
      if (!hasError && obj.type === "catch") return;
      try {
        res = obj.cb(res);
        hasError = false;
      } catch (err) {
        hasError = true;
        res = err;
      }
    });
    if (hasError) {
      throw new Error(res);
    } else {
      return res;
    }
  };

  this.then = (cb) => {
    callBackList.push({
      type: "then",
      cb,
    });
    return this;
  };

  this.catch = (cb) => {
    callBackList.push({
      type: "catch",
      cb,
    });
    return this;
  };

  callBack(resolve, reject);
}

export const myTestFunction1 = async () => {
  const p = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("this is passed"), 1000);
  });

  const res = await p
    .then((res) => {
      console.log(res, "resp1");
      return "ok1";
    })
    .then((res) => {
      console.log(res, "resp2");
      // above implementation failed here, can't handle promise return
      // next then block received whole promise instead of resolved value
      return new MyPromise((resolve, reject) => {
        setTimeout(() => resolve("second prom"), 1000);
      });
    })
    .then((resp) => {
      console.log(resp, "resp3");
      return "then 3";
    })
    .catch((err) => {
      console.log("err", err);
      throw new Error("done");
    })
    .then((resp) => {
      console.log(resp, "resp4");
    })
    .catch((resp) => {
      console.log(resp, "final");
      return "final done ok";
    });

  console.log(res, "out");
};

/////////////////////////////////////////////////////////////////////////////////////////////////

/*
added async await logic to handle if result of some then/catch is promise,
then wait promise to be resolved for next then/catch to be executed
*/

function MyPromise(callBack) {
  const callBackList = [];

  const resolve = async (data) => {
    let res = data;
    let hasError = false;

    for (let i = 0; i < callBackList.length; i++) {
      const obj = callBackList[i];
      if (hasError && obj.type === "then") continue;
      if (!hasError && obj.type === "catch") continue;
      try {
        res = obj.cb(res);
        // adding await here for if promised is returned from some .then
        res = await res;
        hasError = false;
      } catch (err) {
        hasError = true;
        res = err;
      }
    }

    if (hasError) {
      throw new Error(res);
    } else {
      return res;
    }
  };

  const reject = async (data) => {
    let res = data;
    let hasError = true;
    for (let i = 0; i < callBackList.length; i++) {
      if (hasError && obj.type === "then") continue;
      if (!hasError && obj.type === "catch") continue;
      try {
        res = obj.cb(res);
        res = await res;
        hasError = false;
      } catch (err) {
        hasError = true;
        res = err;
      }
    }
    if (hasError) {
      throw new Error(res);
    } else {
      return res;
    }
  };

  this.then = (cb) => {
    callBackList.push({
      type: "then",
      cb,
    });
    return this;
  };

  this.catch = (cb) => {
    callBackList.push({
      type: "catch",
      cb,
    });
    return this;
  };

  callBack(resolve, reject);
}

export const myTestFunction2 = async () => {
  const p = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("this is passed"), 1000);
  });

  const res = await p
    .then((res) => {
      console.log(res, "resp1");
      return "ok1";
    })
    .then((res) => {
      console.log(res, "resp2");
      return new MyPromise((resolve, reject) => {
        setTimeout(() => resolve("second prom"), 1000);
      });
    })
    .then((resp) => {
      console.log(resp, "resp3");
      return "something";
    })
    .catch((err) => {
      console.log("err", err);
      throw new Error("done");
    })
    .then((resp) => {
      console.log(resp, "resp4");
      return "again something";
    })
    .catch((resp) => {
      console.log(resp, "final");
      return "final done ok";
    });

  console.log(res, "out");
};

/////////////////////////////////////////////////////////////////////////////////////////////

/*
if result of some then/catch is promise
achieved above without async/await
*/

function MyPromise(callback) {
  let state = "pending";
  let value = null;
  const callbackQueue = [];

  function fulfill(result) {
    if (state !== "pending") return;
    state = "fulfilled";
    value = result;
    executeCallbacks();
  }

  function reject(error) {
    if (state !== "pending") return;
    state = "rejected";
    value = error;
    executeCallbacks();
  }

  function executeCallbacks() {
    if (callbackQueue.length === 0) return;

    console.log(callbackQueue.length, "len");

    const next = () => {
      if (callbackQueue.length === 0) return value;

      const { onFulfilled, onRejected, resolve, reject } =
        callbackQueue.shift();

      try {
        if (state === "fulfilled") {
          if (typeof onFulfilled === "function") {
            const result = onFulfilled(value);

            if (result instanceof MyPromise) {
              // Handle returned promises by waiting for them to resolve/reject
              result.then(
                (val) => resolve(val),
                (err) => reject(err)
              );
            } else {
              resolve(result);
            }
          } else {
            resolve(value);
          }
        } else if (state === "rejected") {
          if (typeof onRejected === "function") {
            const result = onRejected(value);

            if (result instanceof MyPromise) {
              result.then(
                (val) => resolve(val),
                (err) => reject(err)
              );
            } else {
              resolve(result);
            }
          } else {
            reject(value);
          }
        }
      } catch (error) {
        reject(error);
      }

      // Continue processing the queue
      setTimeout(next, 0);
      // above is just safe check ideally, callbackQueue will only have one object
      // bcz .then returns new MyPromise so that new MyPromise callbackQueue will have next then/catch callback
    };

    // Start processing callbacks
    setTimeout(next, 0);
    // setTimeout is important as if promise is resolved immediately then callback will be executed synchnoursly
    // see the below myTestFunction4 code
    // there we want o/p to be 1, 2
    // without setTimeout it'll be 2, 1
  }

  this.then = function (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      callbackQueue.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });

      if (state !== "pending") {
        executeCallbacks();
      }
    });
  };

  this.catch = function (onRejected) {
    return this.then(null, onRejected);
  };

  try {
    callback(fulfill, reject);
  } catch (error) {
    reject(error);
  }
}

export const myTestFunction3 = async () => {
  const p = new MyPromise((resolve, reject) => {
    setTimeout(() => reject("this is passed"), 1000);
  });

  const res = await p
    .then((res) => {
      console.log(res, "resp1");
      return "ok1";
    })
    .then((res) => {
      console.log(res, "resp2");
      return new MyPromise((resolve, reject) => {
        setTimeout(() => resolve("second prom"), 1000);
      });
    })
    .then((resp) => {
      console.log(resp, "resp3");
      return "something";
    })
    .catch((err) => {
      console.log("err", err);
      throw new Error("done");
    })
    .then((resp) => {
      console.log(resp, "resp4");
      return "again something";
    })
    .catch((resp) => {
      console.log(resp.message, "final");
      return "final done ok";
    });

  console.log(res, "out");
};

const myTestFunction4 = () => {
  const p = new MyPromise((resolve) => {
    resolve("2");
  });
  p.then((msg) => {
    console.log(msg);
  });
  console.log("1");
};
