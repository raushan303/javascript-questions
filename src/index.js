// import "./ES6Class";
// import "./Promises";
// import "./ExecutionOrder.js";
// import "./ThisContext";
import { myFunction } from "./test";
// import "./VarLetConst";

const profile = {
  name: {
    first_name: "Raushan",
    last_name: "Kumar",
  },
  address: {
    city: "Benipatti",
    state: "Bihar",
    country: "India",
  },
  email: "raushan18303@gmail.com",
};

export const showResult = () => {
  console.log("showResult is called");
  myFunction();
};

window.showResult = showResult;
