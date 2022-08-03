let c = {2:1};
let a = {1:c};
let b = {};
Object.assign(b, a);
c[2] = 3;
console.log(b)
// Object.assign复制的是属性值，如果属性值是一个引用类型，那么复制的其实是引用地址，就会存在引用共享的问题。