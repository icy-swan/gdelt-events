// diff let var const
// var 方法作用域。未定义为undefined。定义后方法作用域内都可调
var a = 100;
f();
function f() {
    console.log(a);// 运行时，变量提升重置为undefined
    var a = 1;// 运行时赋值
    console.log(a);// 运行时获得为10，从新定义了局部变量
}
console.log(a);// 全局作用域的100
{
  let aa = 3;
}
console.log(aa);//undefined

//和宏微任务配合；JS中的for循环体比较特殊，每次执行都是一个全新的独立的块作用域
for (var i = 0; i < 10; i++) { 
  setTimeout(function() {  // 同步注册回调函数到 异步的 宏任务队列。
    console.log(i);        // 执行此代码时，同步代码for循环已经执行完成
  }, 0);
}//返回10个10
// i虽然在全局作用域声明，但是在for循环体局部作用域中使用的时候，变量会被固定，不受外界干扰。
for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i); //  i 是循环体内局部作用域，不受外界影响。
  }, 0);
}