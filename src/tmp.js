// const arr = [0, 0, 0, 0];

// for(var i = 0; i < arr.length - 1; i++) {
//   setTimeout(() => {
//     ++arr[i];
//     console.log(arr);
//   }, 2000);
// }

const obj = {
  a: {
    b: {
      c: {
        d: "Help"
      }
    },
    e: 15
  },
  f: {
    g: {
      h2: {
        lp: "Something"
      },
      h1: {
        i: 0
      }
    }
  }
};

/**
 * @param {object} someObj The object to check.
 * @param {string} key The key to check in the object.
 * @return {any} the value of the key in the object or undefined.
 */
const get = (someObj, key) => {};

console.log("lookup:", get(obj, "i"));

const data = {
  title: "My Website",
  list: [
    {
      title: "About",
      list: [
        {
          title: "Mission",
          list: [
            {
              title: "Vision",
              list: ["Create a better future", "Inspire innovation"]
            },
            {
              title: "Values",
              list: ["Integrity", "Excellence", "Collaboration"]
            }
          ]
        },
        {
          title: "Team",
          list: [
            { title: "Management", list: ["CEO", "COO", "CTO"] },
            { title: "Developers", list: ["Front-end", "Back-end"] },
            { title: "Designers", list: ["UI", "UX"] }
          ]
        }
      ]
    },
    {
      title: "Services",
      list: [
        { title: "Web Design", list: [] },
        { title: "Graphic Design", list: [] },
        { title: "SEO Optimization", list: [] }
      ]
    }
  ]
};
