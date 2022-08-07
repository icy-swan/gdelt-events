const need = [1, 2, 3];
const res = [1, 4];
const grace = (need, res) => {
  need = need.sort((a, b) => a - b);
  res = res.sort((a, b) => a - b);
  let gp = 0;
  let sp = 0;
  while (sp < res.length && gp < need.length) {
    if (res[sp] >= need[gp]) {
      gp++;
    }
    sp++;
  }
  return gp;
};
console.log(grace(need, res));

const price = [1, 3, 2, 8, 4, 9];
const fee = 2;
const buy = (price, fee) => {
  let min = price[0];
  let i = 1;
  let r = 0;
  let diff;
  while (i < price.length) {
    if (price[i] < min) {
      min = price[i];
    } else if ((t = price[i] - min - fee) > 0) {
      r += t;
      min = price[i] - fee;
    }
    i++;
  }
  return r;
};
