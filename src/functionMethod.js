function showName(p1, p2, p3) {
  console.log(this, p1, p2, p3);
}

const obj = {
  name: "Raushan",
};

const obj2 = {
  name: "Raju",
};

export const myFunction = () => {
  console.log("my function called");
  showName.apply(obj, ["p1", "p2", "p3"]);

  const firstBindFunc = showName.bind(obj, "a");
  const secondBindFunc = firstBindFunc.bind(obj2, "b"); // still refrence to obj1
  secondBindFunc("c");
};
