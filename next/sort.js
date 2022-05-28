const randomArr = new Array();
const n = 10;
for (let i = 0; i < n; i++) {
  randomArr.push(~~(Math.random() * 100));
}
// https://segmentfault.com/img/bVNIpc?w=554&h=337

// bubble O(n^2) O(n^2) O(n) 空间1
function bubble(arr) {
  const length = arr.length;
  let temp;
  for (let i = 0; i < length - 1; i++) {
    for (j = 0; j < length - 1 - i; j++) {
      let first = arr[j];
      let next = arr[j + 1];
      let temp = first;
      if (first > next) {
        arr[j] = next;
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(bubble(randomArr));

// insert O(n^2) O(n^2) O(n) 空间1
function insert(arr) {
  const length = arr.length;
  for (let i = 1; i < length; i++) {
    let temp = arr[i];
    let j = i;
    for (j; j > 0; j--) {
      if (temp >= arr[j - 1]) {
        break;
      }
      arr[j] = arr[j - 1];
    }
    arr[j] = temp;
  }
  return arr;
}

console.log(insert(randomArr));

//quick O(n log n) O(n log n)  O(n^2) Olog n)
function quick(arr) {
  if(!Array.isArray || arr.length <= 1) {
    return arr;
  }
  const length = arr.length;
  const pivoteIndex = ~~(length / 2);
  const pivote = arr.splice(pivoteIndex, 1)[0];
  const left = [];
  const right = [];
  let temp;
  for(let i = 0; i < length - 1; i ++) {
    temp = arr[i];
    if(temp < pivote) {
      left.push(temp);
    } else {
      right.push(temp);
    }
  }
  return quick(left).concat([pivote], quick(right));
}
console.log(quick(randomArr));

// 归并，拆违n个2数组，排序，222组合排序
// 数组内存连续省空间，填删涉及地址移动；链表可以不连续，插删容易