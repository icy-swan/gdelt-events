const combinationSum = function (con, target) {
  let len = con.length;
  let res = [];
  let temp = [];
  con.sort((a, b) => a - b);
  treeBuilder(temp, target, 0);
  return res;

  function treeBuilder(temp, target, start) {
    if (target < 0) {
      return;
    }
    if (target === 0) {
      res.push(temp);
      return;
    }
    for (let i = start; i < len; i++) {
      // target小于当前数时 直接下一次循坏
      if (target < con[i]) break;
      temp.push(con[i]);
      treeBuilder(temp.slice(), target - con[i], i);
      temp.pop();
    }
  }
};
