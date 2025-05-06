console.log("Promises ================================================");

async function test(retry = 0) {
  return new Promise(async function asd(resolve) {
    try {
      console.log(`retry: ${retry}`);

      if (retry === 2) {
        resolve("123");
      } else {
        badarray.push(1); // just here to force function into catch block
      }
    } catch (e) {
      console.log("catch " + e);

      if (retry < 4) {
        return test(++retry);
      } else {
        resolve("456");
      }
    }
  });
}

(async function () {
  console.log("starting test\n");
  let first = test();
  let value = await first;
  // if you check the output, below logs was never logged.
  console.log(`resolved function a with val: ${value}`);
  console.log("test completed");
})();

/*
if (retry < 4) {
  return test(++retry);
} else {
  resolve("456");
}
here we need resolve(test(++retry)) instead of returning
if you are awaiting on promise resolve, and if promise never resolve/reject then code below `await` will never be executed
*/
