const { Template } = require("webpack");

function unique(arr) {
  if (!arr || !Array.isArray(arr)) {
    return arr;
  } else {
    return Array.from(new Set(arr));
  }
}
// 缺点，无法去掉空的{}

// map 也去不掉空对象，但可以利用json
function unique2(arr) {
  if (Array.isArray(arr)) {
    const t = new Map();
    const tmp = new Set();
    for (let i of arr) {
      key = i;
      if (typeof i === "object") {
        key = JSON.stringify(i);
      }
      if (!t.has(i) && !tmp.has(key)) {
        t.set(i);
      }
      if (typeof i === "object") {
        tmp.add(key);
      }
    }
    return Array.from(t.keys());
  }
  return arr;
}
