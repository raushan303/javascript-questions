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

export const myFunction = async () => {
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
