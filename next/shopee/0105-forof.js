// 只要有iterator就可以进行遍历
// Array, Map, Set, String, TypedArray, arguments
// 有iterator就可以用...析构
const a = new Map();
a.set('1',1);
a.set('2',2);
const b = (a, b) => {
    console.log(a, b);
}
b(...a);
